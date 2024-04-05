import axios from 'axios';
import { getAccessToken } from './ApiUtils';

const instance = axios.create();

instance.defaults.withCredentials = true;
instance.defaults.baseURL = 'http://test.sku-sku.com:8080';

instance.interceptors.request.use(
  (config) => {
      const accessToken = getAccessToken();

      if (!accessToken) {
          window.location.href = '/user/login';
          return config;
      }

      config.headers['Content-Type'] = 'application/json';
      config.headers['Authorization'] = `Bearer ${accessToken}`;

      return config;
  },
  (error) => {
      console.log(error);
      return Promise.reject(error);
  },
);

// instance.interceptors.response.use(
//   (response) => {
//       return response;
//   },
//   async (error) => {
//       if (error.response?.status === 401) {
//           window.location.href = '/unauthorized';
//       } else if (error.response?.status === 404) {
//           window.location.href = '/notFound';
//       } else if (error.response && error.response?.status === 500) {
//           const errorCode = error.response.data.errorCode;
//           if (errorCode === 7001) {
//               console.log('토큰만료');
//               await tokenRefresh(instance);
//               const accessToken = getAccessToken();
//               error.config.headers.Authorization = `Bearer ${accessToken}`;
//               // 중단된 요청을(에러난 요청)을 토큰 갱신 후 재요청
//               return instance(error.config);
//           }
//       }
//       return Promise.reject(error);
//   },
// );

const get = async (url) => {
  try {
      const { data } = await instance.get(url);
      return data;
  } catch (error) {
      console.log(error);
      if (error instanceof Error)
          throw new Error(error.message);
  }
};

const post = async (url, post) => {
  try {
      const result = await instance.post(url, post);
      return result.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { get, post };