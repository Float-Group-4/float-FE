import { useQuery, QueryOptions, UseQueryOptions } from '@tanstack/react-query';
import { isArray } from 'lodash';

import { axiosAPI } from '@base/utils/axios/api';

export function useGet<T>(
  queryKey: any[],
  endPoint: string,
  payload?: any, // add optional for apis not required query params
  options?: UseQueryOptions<T>,
  header?: any,
  responseType?: string,
  customConfig?: any,
) {
  const key = isArray(queryKey) ? queryKey : [queryKey];
  const response = useQuery<T>({
    queryKey: key,
    queryFn: () => {
      return axiosAPI<T>(endPoint, 'GET', payload, header, responseType, customConfig);
    },
    ...options,
  });

  return response;
}

export default useGet;
