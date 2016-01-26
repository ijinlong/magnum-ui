/**
 * Copyright 2015 IBM Corporation
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
   * @ngdoc controller
   * @name createPodInfoController
   * @ngController
   *
   * @description
   * Controller for the containers pod info step in create workflow
   */
  angular
    .module('horizon.dashboard.containers.services')
    .controller('createServiceInfoController', createServiceInfoController)
    .directive("myDirective", [function () {
	    return {
	        scope: {
	            fileread: "=?bind"
	        },
	        link: function (scope, element, attributes) {
	            element.bind("change", function (changeEvent) {
	                var reader = new FileReader();
	                reader.onload = function (loadEvent) {
	                    scope.$apply(function () {
	                        scope.fileread = loadEvent.target.result;
	                    });
	                }
	                reader.readAsText(changeEvent.target.files[0]);
	            });
	        }
	    }
	}]);

  createServiceInfoController.$inject = [
    '$q',
    '$scope',
    'horizon.dashboard.containers.basePath',
    'horizon.app.core.openstack-service-api.magnum'
  ];

  function createServiceInfoController($q, $scope, basePath, magnum) {
    var ctrl = this;
    ctrl.bays = [{id:"", name: gettext("Choose a Bay Name")}];
    $scope.model.newServiceSpec.bay_uuid = "";
    $scope.baydetail = {
            name: "",
            id: "",
            baymodel: "",
            master_count: "",
            node_count: "",
            discovery_url: "",
            timeout: ""
        };

    $scope.changeBay = function(){
        // show Bay Detail
        if(!$scope.model.newServiceSpec.bay_uuid){
          $("#bay_detail").hide();
          $("#bay_detail_none").show();
        } else {
          angular.forEach(ctrl.bays, function(bay, idx){
            if($scope.model.newServiceSpec.bay_uuid === bay.id){
              $("#bay_detail").show();
              $("#bay_detail_none").hide();
              $scope.baydetail.name = bay.name;
              $scope.baydetail.id = bay.id;
              $scope.baydetail.baymodel_id = bay.baymodel_id;
              $scope.baydetail.master_count = bay.master_count;
              $scope.baydetail.node_count = bay.node_count;
              $scope.baydetail.discovery_url = bay.discovery_url;
              $scope.baydetail.timeout = bay.timeout;
            }
          });
        }
      }; 

    init();
    $("#bay_detail").hide();
    $("#bay_detail_none").show();
    function init() {
      magnum.getBays({paginate: false}).success(onGetBays);
    }

    function onGetBays(response) {
      Array.prototype.push.apply(ctrl.bays, response.items);
    }

  }
})();
