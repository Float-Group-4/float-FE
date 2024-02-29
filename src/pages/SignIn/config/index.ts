import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_SIGN_IN_USERNAME]: {
    languageKey: 'Tên đăng nhập',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      placeholder: 'Nhập tên đăng nhập',
    },
    validate: (value: any) => !!value || 'Hãy nhập tên đăng nhập',
  },
  [keyNames.KEY_NAME_SIGN_IN_PASSWORD]: {
    languageKey: 'Mật khẩu',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      type: 'password',
      placeholder: 'Nhập tên mật khẩu',
    },
    validate: (value: any) => !!value || 'Hãy nhập mật khẩu',
  },
};

export default writeConfig;
