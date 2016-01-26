#  Copyright 2015 IBM Systems.
#
#    Licensed under the Apache License, Version 2.0 (the "License"); you may
#    not use this file except in compliance with the License. You may obtain
#    a copy of the License at
#
#         http://www.apache.org/licenses/LICENSE-2.0
#
#    Unless required by applicable law or agreed to in writing, software
#    distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
#    WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
#    License for the specific language governing permissions and limitations
#    under the License.

from django.views import generic

from magnum_ui.api import magnum

from openstack_dashboard.api.rest import urls
from openstack_dashboard.api.rest import utils as rest_utils


def change_to_id(obj):
    """Change key named 'uuid' to 'id'

    Magnum returns objects with a field called 'uuid' many of Horizons
    directives however expect objects to have a field called 'id'.
    """
    obj['id'] = obj.pop('uuid')
    return obj


@urls.register
class BayModel(generic.View):
    """API for retrieving a single baymodel"""
    url_regex = r'containers/baymodels/(?P<baymodel_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, baymodel_id):
        """Get a specific baymodel"""
        return magnum.baymodel_show(request, baymodel_id).to_dict()


@urls.register
class BayModels(generic.View):
    """API for Magnum BayModels"""
    url_regex = r'containers/baymodels/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the BayModels for a project.

        The returned result is an object with property 'items' and each
        item under this is a BayModel.
        """
        result = magnum.baymodel_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more BayModels by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for baymodel_id in request.DATA:
            magnum.baymodel_delete(request, baymodel_id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new BayModel.

        Returns the new BayModel object on success.
        """
        new_baymodel = magnum.baymodel_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/containers/baymodel/%s' % new_baymodel.uuid,
            new_baymodel.to_dict())


@urls.register
class Bay(generic.View):
    """API for retrieving a single bay"""
    url_regex = r'containers/bays/(?P<bay_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, bay_id):
        """Get a specific bay"""
        return magnum.bay_show(request, bay_id).to_dict()


@urls.register
class Bays(generic.View):
    """API for Magnum Bays"""
    url_regex = r'containers/bays/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Bays for a project.

        The returned result is an object with property 'items' and each
        item under this is a Bay.
        """
        result = magnum.bay_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Bays by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for bay_id in request.DATA:
            magnum.bay_delete(request, bay_id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Bay.

        Returns the new Bay object on success.
        """
        new_bay = magnum.bay_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/containers/bay/%s' % new_bay.uuid,
            new_bay.to_dict())


@urls.register
class Container(generic.View):
    """API for retrieving a single container"""
    url_regex = r'containers/containers/(?P<container_id>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, container_id):
        """Get a specific container"""
        return magnum.container_show(request, container_id).to_dict()


@urls.register
class Containers(generic.View):
    """API for Magnum Containers"""
    url_regex = r'containers/containers/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Containers for a project.

        The returned result is an object with property 'items' and each
        item under this is a Container.
        """
        result = magnum.container_list(request)
        return {'items': [change_to_id(n.to_dict()) for n in result]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Containers by ID.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for container_id in request.DATA:
            magnum.container_delete(request, container_id)

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Container.

        Returns the new Container object on success.
        """
        container = magnum.container_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/containers/container/%s' % container.uuid,
            container.to_dict())


@urls.register
class Pod(generic.View):
    """API for retrieving a single pod
    """
    url_regex = r'containers/pods/(?P<bay_uuid>[^/]+)/(?P<pod_uuid>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, bay_uuid, pod_uuid):
        """Get a specific pod
        """
        return magnum.pod_show(request, pod_uuid, bay_uuid).to_dict()


@urls.register
class Pods(generic.View):
    """API for Magnum Pods
    """
    url_regex = r'containers/pods/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Pods for a project.

        The returned result is an object with property 'items' and each
        item under this is a Pod.
        """
        bays = magnum.bay_list(request);
        baymodels = magnum.baymodel_list(request);
        result = []
        baymodel = {}
        for model in baymodels:
            baymodel[model.uuid] = model
        for bay in bays:
            if bay.status == 'CREATE_COMPLETE' and (
                baymodel[bay.baymodel_id].coe == "kubernetes"):
                result += magnum.pod_list(request, bay.name)
        pods = []
        for p in result:
            pods.append(magnum.pod_show(request, p.uuid, p.bay_uuid))
        return {'items': [change_to_id(p.to_dict()) for p in pods]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Pods by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for obj in request.DATA:
            magnum.pod_delete(request, obj.get('pod_id'), obj.get('bay_id'))

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Pod.

        Returns the new Pod object on success.
        """
        new_pod = magnum.pod_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/containers/pod/%s' % new_pod.uuid,
            new_pod.to_dict())


@urls.register
class ReplicationControllers(generic.View):
    """API for retrieving a single replicationcontrollers
    """
    url_regex = r'containers/replicationcontrollers/(?P<bay_uuid>[^/]+)/\
                (?P<replicationcontrollers_uuid>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, bay_uuid, rcs_uuid):
        """Get a specific replicationcontroller
        """
        return magnum.rc_show(request, rcs_uuid, bay_uuid).to_dict()


@urls.register
class ReplicationControllers(generic.View):
    """API for Magnum ReplicationControllers
    """
    url_regex = r'containers/replicationcontrollers/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the ReplicationControllers for a project.

        The returned result is an object with property 'items' and each
        item under this is a ReplicationController.
        """
        bays = magnum.bay_list(request);
        baymodels = magnum.baymodel_list(request);
        result = []
        baymodel = {}
        for model in baymodels:
            baymodel[model.uuid] = model
        for bay in bays:
            if bay.status == 'CREATE_COMPLETE' and (
            baymodel[bay.baymodel_id].coe == "kubernetes"):
                result += magnum.rc_list(request, bay.uuid)
        rcs = []
        for r in result:
            rcs.append(magnum.rc_show(request, r.uuid, r.bay_uuid))
        return {'items': [change_to_id(r.to_dict()) for r in rcs]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more ReplicationControllers by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for obj in request.DATA:
            magnum.rc_delete(request, obj.get('rc_id'), obj.get('bay_id'))

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new ReplicationController.

        Returns the new ReplicationController object on success.
        """
        new_rc = magnum.rc_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/containers/replicationcontrollers/%s' % new_rc.uuid,
            new_rc.to_dict())

@urls.register
class Service(generic.View):
    """API for retrieving a single service
    """
    url_regex = r'containers/services/(?P<bay_uuid>[^/]+)/\
                (?P<service_uuid>[^/]+)$'

    @rest_utils.ajax()
    def get(self, request, bay_uuid, service_uuid):
        """Get a specific service
        """
        return magnum.service_show(request, service_uuid, bay_uuid).to_dict()


@urls.register
class Services(generic.View):
    """API for Magnum Services
    """
    url_regex = r'containers/services/$'

    @rest_utils.ajax()
    def get(self, request):
        """Get a list of the Services for a project.

        The returned result is an object with property 'items' and each
        item under this is a Service.
        """
        bays = magnum.bay_list(request);
        baymodels = magnum.baymodel_list(request);
        result = []
        baymodel = {}
        for model in baymodels:
            baymodel[model.uuid] = model
        for bay in bays:
            if bay.status == 'CREATE_COMPLETE' and (
                baymodel[bay.baymodel_id].coe == "kubernetes"):
                result += magnum.service_list(request, bay.uuid)
        services = []
        for s in result:
            services.append(magnum.service_show(request, s.uuid, s.bay_uuid))
        return {'items': [change_to_id(s.to_dict()) for s in services]}

    @rest_utils.ajax(data_required=True)
    def delete(self, request):
        """Delete one or more Services by id.

        Returns HTTP 204 (no content) on successful deletion.
        """
        for obj in request.DATA:
            magnum.service_delete(request, obj.get('service_id'),
            obj.get('bay_id'))

    @rest_utils.ajax(data_required=True)
    def post(self, request):
        """Create a new Service.

        Returns the new Service object on success.
        """
        new_service = magnum.service_create(request, **request.DATA)
        return rest_utils.CreatedResponse(
            '/api/containers/service/%s' % new_service.uuid,
            new_service.to_dict())
