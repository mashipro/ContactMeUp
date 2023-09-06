import axios, {AxiosError} from 'axios';
import {Endpoint, getEndpoint} from './APIUtils';
import {BaseURLPools} from './EndpointPool';
import {Toast} from 'react-native-toast-message/lib/src/Toast';

const APICall = async (endpoint: Endpoint, params?: any, payload?: any) => {
  // axios.defaults.baseURL = GlobalValue.BaseURL;

  console.log('new Api call with detail:', {endpoint, params, payload});

  const selectEndpoint = getEndpoint(endpoint)!;

  return await axios({
    baseURL: BaseURLPools[selectEndpoint.base],
    method: selectEndpoint.method,
    url:
      params === undefined
        ? selectEndpoint.url
        : `${selectEndpoint.url}${params.id}`,
    data: payload,
    // params: params,
  })
    .then(result => {
      console.log('request success...');
      return result.data;
    })
    .catch((error: AxiosError) => {
      console.error('axios error', error);
      Toast.show({
        type: 'error',
        text1: 'Error in fetching data',
        text2: 'Please try again later',
      });
      throw error;
    });
};

export default APICall;
