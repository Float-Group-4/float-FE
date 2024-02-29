import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { isArray } from 'lodash';

import { axiosAPI, CustomAxiosConfigType } from '@base/utils/axios/api';

export function useMutationCustom<T, E extends {} = {}, V extends {} = {}>(
  queryKey: any[],
  endPoint: string,
  method: string,
  options?: UseMutationOptions<T, E, V>,
  header?: any,
  responseType?: string,
  customConfig?: any,
  useInterceptors?: boolean,
) {
  const key = isArray(queryKey) ? queryKey[0] : queryKey;
  const response = useMutation<T, E, V>({
    mutationKey: [key],
    mutationFn: (payload: V) => {
      return axiosAPI<T>(
        endPoint,
        method,
        payload,
        header,
        responseType,
        customConfig,
        useInterceptors,
      );
    },
    ...options,
  });

  return response;
}

export default useMutationCustom;
