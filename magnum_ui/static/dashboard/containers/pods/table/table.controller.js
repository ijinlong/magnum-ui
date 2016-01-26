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
    .module('horizon.dashboard.containers.pods')
    .controller('containersPodTableController', containersPodTableController);

  containersPodTableController.$inject = [
    '$scope',
    'horizon.app.core.openstack-service-api.magnum'
  ];

  function containersPodTableController($scope, magnum) {
    var ctrl = this;
    ctrl.ipods = [];
    ctrl.pods = [];

    ctrl.singleDelete = singleDelete;
    ctrl.batchDelete = batchDelete;

    /**
     * Filtering - client-side MagicSearch
     * all facets for bay table
     */
    ctrl.podFacets = [
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
        'label': gettext('Status'),
        'name': 'status',
        'singleton': true
      },
      {
        'label': gettext('Host'),
        'name': 'host',
        'singleton': true
      }
      
    ];


    init();

    function init() {
      magnum.getPods().success(getPodsSuccess);
    }

    function getPodsSuccess(response) {
      ctrl.pods = response.items;
    }

    function singleDelete(pod) {
      var id = []
      id.push({'pod_id': pod.id, 'bay_id': pod.bay_uuid})
      magnum.deletePod(id).success(function() {
        ctrl.pods.splice(ctrl.pods.indexOf(pod), 1);
      });
    }

    function batchDelete() {
      var ids = [];
      for (var id in $scope.selected) {
        if ($scope.selected[id].checked) {
         var pod_id = $scope.selected[id].item.id;
         var bay_id = $scope.selected[id].item.bay_uuid;
          ids.push({'pod_id': pod_id, 'bay_id': bay_id});
        }
      }
      magnum.deletePods(ids).success(function() {
        for (var b in ids) {
          var todelete = ctrl.pods.filter(function(obj) {
            return obj.id == ids[b];
          });
          ctrl.pods.splice(ctrl.pods.indexOf(todelete[0]), 1);
        }
        $scope.selected = {};
      });
    }
  }

})();
