import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any) => {
  let parsedParams: any = {};

  parsedParams = {
    username: params?.[keyNames.KEY_NAME_SIGN_IN_USERNAME],
  };
  return parsedParams;
};
