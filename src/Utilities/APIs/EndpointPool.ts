export const BaseURLPools = [
  'https://contact.herokuapp.com',
  'https://jsonplaceholder.typicode.com',
];

export default [
  {
    endpoint: 'getContact',
    url: '/contact',
    method: 'get',
    base: 0,
  },
  {
    endpoint: 'postContact',
    url: '/contact',
    method: 'post',
    base: 0,
  },
  {
    endpoint: 'getContactByID',
    url: '/contact/',
    method: 'get',
    base: 0,
  },
  {
    endpoint: 'editContactByID',
    url: '/contact/',
    method: 'put',
    base: 0,
  },
  {
    endpoint: 'deleteContactByID',
    url: '/contact/',
    method: 'delete',
    base: 0,
  },
  {
    endpoint: 'getPosts',
    url: '/posts',
    method: 'get',
    base: 1,
  },
] as const;
