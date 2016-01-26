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
    .module('horizon.dashboard.containers.replicationcontrollers')
    .controller('createRCInfoController', createRCInfoController)
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

  createRCInfoController.$inject = [
    '$q',
    '$scope',
    'horizon.dashboard.containers.basePath',
    'horizon.app.core.openstack-service-api.magnum'
  ];

  function createRCInfoController($q, $scope, basePath, magnum) {
    var ctrl = this;
    ctrl.baymodels = {};
    ctrl.bays = [{id:"", name: gettext("Choose a Bay Name")}];
    $scope.model.newRCSpec.bay_uuid = "";
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
        if(!$scope.model.newRCSpec.bay_uuid){
          $("#bay_detail").hide();
          $("#bay_detail_none").show();
        } else {
          angular.forEach(ctrl.bays, function(bay, idx){
            if($scope.model.newRCSpec.bay_uuid === bay.id){
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
        magnum.getBayModels().success(onGetBayModel);
    }

    function onGetBays(response) {
    	for (var item in response.items){
            if (response.items[item].status == "CREATE_COMPLETE"){
            var baymodel_id = response.items[item].baymodel_id;
            var baymodel = ctrl.baymodels[baymodel_id];
            if (baymodel.coe == "kubernetes") {
          	  ctrl.bays.push(response.items[item]);
            }
     
            }
        }
    }
    function onGetBayModel(response){
        for (var item in response.items) {
     	   ctrl.baymodels[response.items[item].id] = response.items[item];
        }
        magnum.getBays({paginate: false}).success(onGetBays);
        }
  }
})();
