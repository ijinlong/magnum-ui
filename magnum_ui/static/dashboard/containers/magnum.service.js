/**
 * Copyright 2015, IBM Systems
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function () {
  'use strict';

  angular
    .module('horizon.app.core.openstack-service-api')
    .factory('horizon.app.core.openstack-service-api.magnum', MagnumAPI);

  MagnumAPI.$inject = [
    'horizon.framework.util.http.service',
    'horizon.framework.widgets.toast.service'
  ];

  function MagnumAPI(apiService, toastService) {
    var service = {
      createBay: createBay,
      getBay: getBay,
      getBays: getBays,
      deleteBay: deleteBay,
      deleteBays: deleteBays,
      createBayModel: createBayModel,
      getBayModel: getBayModel,
      getBayModels: getBayModels,
      deleteBayModel: deleteBayModel,
      deleteBayModels: deleteBayModels,
      createContainer: createContainer,
      getContainer: getContainer,
      getContainers: getContainers,
      deleteContainer: deleteContainer,
      deleteContainers: deleteContainers,
      createPod: createPod,
      getPod: getPod,
      getPods: getPods,
      deletePod: deletePod,
      deletePods: deletePods,
      createReplicationController: createReplicationController,
      getReplicationController: getReplicationController,
      getReplicationControllers: getReplicationControllers,
      deleteReplicationController: deleteReplicationController,
      deleteReplicationControllers: deleteReplicationControllers,
      createService: createService,
      getService: getService,
      getServices: getServices,
      deleteService: deleteService,
      deleteServices: deleteServices,

    };

    return service;

    //////////
    // Bays //
    //////////

    function createBay(params) {
        return apiService.post('/api/containers/bays/', params)
          .error(function() {
            toastService.add('error', gettext('Unable to create Bay.'));
          });
      }

    function getBay(id) {
      return apiService.get('/api/containers/bays/' + id)
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Bay.'));
        });
    }

    function getBays() {
      return apiService.get('/api/containers/bays/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Bays.'));
        });
    }

    function deleteBay(id) {
      return apiService.delete('/api/containers/bays/', [id])
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Bay.'));
        });
    }

    function deleteBays(ids) {
      return apiService.delete('/api/containers/bays/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Bays.'));
        });
    }

    ///////////////
    // BayModels //
    ///////////////

    function createBayModel(params) {
      return apiService.post('/api/containers/baymodels/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create BayModel'));
        });
    }

    function getBayModel(id) {
      return apiService.get('/api/containers/baymodels/' + id)
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the BayModel.'));
        });
    }

    function getBayModels() {
      return apiService.get('/api/containers/baymodels/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the BayModels.'))
        });
    }

    function deleteBayModel(id) {
      return apiService.delete('/api/containers/baymodels/', [id])
        .error(function() {
          toastService.add('error', gettext('Unable to delete the BayModel.'))
        })
    }

    function deleteBayModels(ids) {
      return apiService.delete('/api/containers/baymodels/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the BayModels.'))
        })
    }

    ////////////////
    // Containers //
    ////////////////

    function createContainer(params) {
      return apiService.post('/api/containers/containers/', params)
        .error(function() {
          toastService.add('error', gettext('Unable to create Container.'));
        });
    }

    function getContainer(id) {
      return apiService.get('/api/containers/containers/' + id)
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Container.'));
        });
    }

    function getContainers() {
      return apiService.get('/api/containers/containers/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Containers.'));
        });
    }

    function deleteContainer(id) {
      return apiService.delete('/api/containers/containers/', [id])
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Container.'));
        });
    }

    function deleteContainers(ids) {
      return apiService.delete('/api/containers/containers/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Containers.'));
        });
    }

    //////////
    // Pods //
    //////////

    function createPod(params) {
        return apiService.post('/api/containers/pods/', params)
          .error(function() {
            toastService.add('error', gettext('Unable to create Pod.'));
          });
      }

    function getPod(id) {
        return apiService.get('/api/containers/pods/' + id)
          .error(function() {
            toastService.add('error', gettext('Unable to retrieve the Pods.'));
          });
      }

    function getPods() {
      return apiService.get('/api/containers/pods/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Pods.'));
        });
    }

    function deletePod(id) {
      return apiService.delete('/api/containers/pods/', id)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Pod.'));
        });
    }

    function deletePods(ids) {
      return apiService.delete('/api/containers/pods/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Pods.'));
        });
    }

    ///////////////////////////
    //ReplicationControllers //
    ///////////////////////////

    function createReplicationController(params) {
        return apiService.post('/api/containers/replicationcontrollers/', params)
          .error(function() {
            toastService.add('error', gettext('Unable to create ReplicationControllers.'));
          });
      }

    function getReplicationController(id) {
        return apiService.get('/api/containers/replicationcontrollers/' + id)
          .error(function() {
            toastService.add('error', gettext('Unable to retrieve the ReplicationControllers.'));
          });
      }

    function getReplicationControllers() {
      return apiService.get('/api/containers/replicationcontrollers/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the ReplicationControllers.'));
        });
    }

    function deleteReplicationController(id) {
      return apiService.delete('/api/containers/replicationcontrollers/', id)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the ReplicationControllers.'));
        });
    }

    function deleteReplicationControllers(ids) {
      return apiService.delete('/api/containers/replicationcontrollers/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the ReplicationControllers.'));
        });
    }

    //////////////
    // Services //
    /////////////

    function createService(params) {
        return apiService.post('/api/containers/services/', params)
          .error(function() {
            toastService.add('error', gettext('Unable to create Service.'));
          });
      }

    function getService(id) {
        return apiService.get('/api/containers/services/' + id)
          .error(function() {
            toastService.add('error', gettext('Unable to retrieve the Services.'));
          });
      }

    function getServices() {
      return apiService.get('/api/containers/services/')
        .error(function() {
          toastService.add('error', gettext('Unable to retrieve the Services.'));
        });
    }

    function deleteService(id) {
      return apiService.delete('/api/containers/services/', id)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Service.'));
        });
    }

    function deleteServices(ids) {
      return apiService.delete('/api/containers/services/', ids)
        .error(function() {
          toastService.add('error', gettext('Unable to delete the Services.'));
        });
    }
  }

}());
