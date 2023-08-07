import createEndpointArray from './APIUtils';

export const EndpointPool = createEndpointArray(
  {
    endpoint: 'getContact',
    url: '/contact',
    method: 'get',
  },
  {
    endpoint: 'postContact',
    url: '/contact',
    method: 'post',
  },
  {
    endpoint: 'getContactByID',
    url: '/contact/',
    method: 'get',
  },
  {
    endpoint: 'editContactByID',
    url: '/contact/',
    method: 'put',
  },
  {
    endpoint: 'deleteContactByID',
    url: '/contact/',
    method: 'delete',
  },
);

// console.log('EndpointPool', EndpointPool);
