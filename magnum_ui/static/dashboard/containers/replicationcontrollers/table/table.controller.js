/**
 * Copyright 2015 IBM Systems.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License. You may obtain
 * a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 */

(function() {
  'use strict';

  /**
   * @ngdoc overview
   * @name containersPodTableController
   * @ngController
   *
   * @description
   * Controller for the containers pod table
   */
  angular
    .module('horizon.dashboard.containers.replicationcontrollers')
    .controller('containersRCTableController', containersRCTableController);

  containersRCTableController.$inject = [
    '$scope',
    'horizon.app.core.openstack-service-api.magnum'
  ];

  function containersRCTableController($scope, magnum) {
    var ctrl = this;
    ctrl.ircs = [];
    ctrl.rcs = [];

    ctrl.singleDelete = singleDelete;
    ctrl.batchDelete = batchDelete;

    /**
     * Filtering - client-side MagicSearch
     * all facets for replicationcontroller table
     */
    ctrl.replicationcontrollerFacets = [
      {
        'label': gettext('Name'),
        'name': 'name',
        'singleton': true
      },
      {
        'label': gettext('UUID'),
        'name': 'id',
        'singleton': true
      },
      {
        'label': gettext('Images'),
        'name': 'images',
        'singleton': true
      },
      {
        'label': gettext('Labels'),
        'name': 'labels',
        'singleton': true
      },
      {
        'label': gettext('Replicas'),
        'name': 'replicas',
        'singleton': true
      }
      
    ];


    init();

    function init() {
      magnum.getReplicationControllers().success(getReplicationControllersSuccess);
    }

    function getReplicationControllersSuccess(response) {
      ctrl.rcs = response.items;
    }

    function singleDelete(rc) {
      var id = []
      id.push({'rc_id': rc.id, 'bay_id': rc.bay_uuid})
      magnum.deleteReplicationController(id).success(function() {
        ctrl.rcs.splice(ctrl.rcs.indexOf(rc), 1);
      });
    }

    function batchDelete() {
      var ids = [];
      for (var id in $scope.selected) {
        if ($scope.selected[id].checked) {
         var rc_id = $scope.selected[id].item.id;
         var bay_id = $scope.selected[id].item.bay_uuid;
          ids.push({'rc_id': rc_id, 'bay_id': bay_id});
        }
      }
      magnum.deleteReplicationControllers(ids).success(function() {
        for (var b in ids) {
          var todelete = ctrl.rcs.filter(function(obj) {
            return obj.id == ids[b];
          });
          ctrl.rcs.splice(ctrl.rcs.indexOf(todelete[0]), 1);
        }
        $scope.selected = {};
      });
    }
  }

})();
