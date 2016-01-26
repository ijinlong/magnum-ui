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
    .factory('horizon.dashboard.containers.replicationcontrollers.workflow', rcWorkflow);

  rcWorkflow.$inject = [
    'horizon.dashboard.containers.basePath',
    'horizon.app.core.workflow.factory'
  ];

  function rcWorkflow(basePath, dashboardWorkflow) {
    return dashboardWorkflow({
      title: gettext('Create ReplicationController'),

      steps: [
        {
          title: gettext('info'),
          templateUrl: basePath + 'replicationcontrollers/create/info/info.html',
          helpUrl: basePath + 'replicationcontrollers/create/info/info.help.html',
          formName: 'replicationcontrollerInfoForm'
        }
         
      ],

      btnText: {
        finish: gettext('Create')
      },

      btnIcon: {
        finish: 'fa fa-cloud-download'
      }
    });
  }
})();
