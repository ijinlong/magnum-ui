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

  angular
    .module('horizon.dashboard.containers.replicationcontrollers')
    .factory('replicationcontrollerModel', replicationcontrollerModel);

  replicationcontrollerModel.$inject = [
    'horizon.app.core.openstack-service-api.magnum'
  ];

  function replicationcontrollerModel(magnum) {
    var model = {
      newRCSpec: {},

      // API methods
      init: init,
      createRC: createRC
    };

    function initNewRCSpec() {
      model.newRCSpec = {
        bay_uuid: null,
        manifest: null,
        manifest_url: null
      };
    }

    function init() {
      // Reset the new ReplicationController spec
    	initNewRCSpec();
    }

    function createRC() {
      var finalSpec = angular.copy(model.newRCSpec);

      cleanNullProperties(finalSpec);

      return magnum.createReplicationController(finalSpec);
    }

    function cleanNullProperties(finalSpec) {
      // Initially clean fields that don't have any value.
      for (var key in finalSpec) {
        if (finalSpec.hasOwnProperty(key) && finalSpec[key] === null) {
          delete finalSpec[key];
        }
      }
    }

    return model;
  }
})();
