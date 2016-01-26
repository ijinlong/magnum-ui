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
    .module('horizon.dashboard.containers.services')
    .controller('containersServiceTableController', containersServiceTableController);

  containersServiceTableController.$inject = [
    '$scope',
    'horizon.app.core.openstack-service-api.magnum'
  ];

  function containersServiceTableController($scope, magnum) {
    var ctrl = this;
    ctrl.iservices = [];
    ctrl.services = [];

    ctrl.singleDelete = singleDelete;
    ctrl.batchDelete = batchDelete;

    /**
     * Filtering - client-side MagicSearch
     * all facets for service table
     */
    ctrl.serviceFacets = [
      {
        'label': gettext('Name'),
        'name': 'name',
        'singleton': true
      },
      {
        'label': gettext('Labels'),
        'name': 'labels',
        'singleton': true
      },
      {
        'label': gettext('Selector'),
        'name': 'selector',
        'singleton': true
      },
      {
        'label': gettext('ip'),
        'name': 'IP',
        'singleton': true
      }
      
    ];


    init();

    function init() {
      magnum.getServices().success(getServicesSuccess);
    }

    function getServicesSuccess(response) {
      ctrl.services = response.items;
    }

    function singleDelete(service) {
      var id = []
      id.push({'service_id': service.id, 'bay_id': service.bay_uuid})
      magnum.deleteService(id).success(function() {
        ctrl.services.splice(ctrl.services.indexOf(service), 1);
      });
    }

    function batchDelete() {
      var ids = [];
      for (var id in $scope.selected) {
        if ($scope.selected[id].checked) {
         var service_id = $scope.selected[id].item.id;
         var bay_id = $scope.selected[id].item.bay_uuid;
          ids.push({'service_id': service_id, 'bay_id': bay_id});
        }
      }
      magnum.deleteServices(ids).success(function() {
        for (var b in ids) {
          var todelete = ctrl.services.filter(function(obj) {
            return obj.id == ids[b];
          });
          ctrl.services.splice(ctrl.services.indexOf(todelete[0]), 1);
        }
        $scope.selected = {};
      });
    }
  }

})();
