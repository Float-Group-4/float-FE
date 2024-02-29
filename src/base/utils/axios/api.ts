import axios, { AxiosRequestConfig, AxiosResponse, ResponseType } from 'axios';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';

export const contentFormHeaders = {
  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
};

export type CustomAxiosConfigType = Omit<
  AxiosRequestConfig,
  'method' | 'url' | 'headers' | 'responseType' | 'data' | 'params'
>;

export const axiosApi = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: 'api/v1',
});

export const axiosNoInterceptors = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  baseURL: 'api/v1',
});

axiosApi.interceptors.request.use(
  (config: any) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axiosNoInterceptors.get('auth/refresh', {
          headers: {
            Authorization: `Bearer ${refreshToken}`,
          },
        });

        localStorage.setItem('accessToken', response.data.accessToken);
        localStorage.setItem('refreshToken', response.data.refreshToken);

        originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
        return axios(originalRequest);
      } catch (error) {
        /* empty */
      }
    }

    return Promise.reject(error);
  },
);

export async function axiosAPI<T>(
  endPoint: string,
  method: string,
  payload = {},
  headers = {},
  responseType = 'json',
  customConfig: CustomAxiosConfigType = {},
  useInterceptors = true,
): Promise<T> {
  const config: AxiosRequestConfig<any> = {
    method: method,
    url: endPoint as string,
    headers: headers,
    responseType: responseType as ResponseType,
  };

  if (method === 'GET') {
    config.params = payload;
  } else {
    config.data = payload;
  }

  if (!isEmpty(customConfig)) {
    merge(config, customConfig);
  }

  try {
    const response: AxiosResponse = useInterceptors
      ? await axiosApi(config)
      : await axiosNoInterceptors(config);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
}
