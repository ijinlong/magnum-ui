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
   * @name containersBayModalController
   * @ngController
   *
   * @description
   * Controller for the containers bay create modal
   */
  angular
    .module('horizon.dashboard.containers.services')
    .controller('containersServiceController', containersServiceController);

  containersServiceController.$inject = [
    '$modal',
    '$window',
    'horizon.dashboard.containers.basePath',
    'horizon.app.core.openstack-service-api.magnum'
  ];

  function containersServiceController($modal, $window, basePath, magnum) {
    var ctrl = this;

    ctrl.openServiceCreateWizard = openServiceCreateWizard;

    function openServiceCreateWizard(launchContext) {
      var options = {
        controller: 'ModalContainerController',
        backdrop: 'static',
        template: '<wizard ng-controller="createServiceWizardController"></wizard>"',
        windowClass: 'modal-dialog-wizard',
        resolve: {
          launchContext: function() {
            return launchContext;
          }
        }
      };
      var launchInstanceModal = $modal.open(options);
      var handleModalClose = function (redirectPropertyName) {
        return function () {
          if (launchContext && launchContext[redirectPropertyName]) {
            $window.location.href = launchContext[redirectPropertyName];
          }
        };
      };
      launchInstanceModal.result.then(
        handleModalClose('successUrl'),
        handleModalClose('dismissUrl')
      );
    }
  }

})();
