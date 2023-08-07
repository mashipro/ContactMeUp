import {EndpointPool} from './EndpointPool';

enum EndpointMethod {
  get,
  post,
  delete,
  put,
}

export type EndpointMethodType = keyof typeof EndpointMethod;

export type EndpointTypes = {
  endpoint: string;
  url: string;
  method: EndpointMethodType;
  payload?: any;
  params?: any;
};

export type Endpoint = (typeof EndpointPool)[number]['endpoint'];

export const getEndpoint = (endpoint: Endpoint) => {
  return EndpointPool.find(item => item.endpoint === endpoint);
};

// /**
//  * Endpoint Array Creator
//  * @param args
//  * @returns EndpointTypes[]
//  */

function createEndpointArray<
  T extends readonly EndpointTypes[] & Array<{endpoint: V}>,
  V extends string,
>(...args: T) {
  return args;
}

export default createEndpointArray;