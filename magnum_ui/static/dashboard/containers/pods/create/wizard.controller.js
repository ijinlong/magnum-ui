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
   * @name createBayWizardController
   * @ngController
   *
   * @description
   * Controller for the containers bay create modal
   */
  angular
    .module('horizon.dashboard.containers.pods')
    .controller('createPodWizardController', createPodWizardController);

  createPodWizardController.$inject = [
    '$scope',
    'podModel',
    'horizon.dashboard.containers.pods.workflow'
  ];

  function createPodWizardController($scope, model, workflow) {
    $scope.workflow = workflow;
    $scope.model = model;
    $scope.model.init();
    $scope.submit = $scope.model.createPod;
  }

})();
