import { LabelValue } from '@base/types';
import * as keyNames from './config/keyNames';

export const finalizeParams = (params: any) => {
  let parsedParams: any = {};

  parsedParams = {
    name: params?.[keyNames.KEY_NAME_TEAMNAME],
  };
  return parsedParams;
};
