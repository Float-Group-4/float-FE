import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_SIGN_IN_USERNAME]: {
    languageKey: 'Email',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      type: 'email',
      placeholder: 'Email',
    },
    validate: (value: any) => !!value || 'Enter email',
  },
};

export default writeConfig;
