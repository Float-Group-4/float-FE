import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_SIGN_UP_NAME]: {
    languageKey: 'Your name',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      placeholder: 'First and last name',
    },
    validate: (value: any) => !!value || 'Enter your name',
  },
  [keyNames.KEY_NAME_SIGN_UP_EMAIL]: {
    languageKey: 'Email',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      type: 'email',
      placeholder: 'Work email',
    },
    validate: (value: any) => !!value || 'Enter email',
  },
  [keyNames.KEY_NAME_SIGN_UP_PASSWORD]: {
    languageKey: 'Password',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      type: 'password',
      placeholder: 'Password',
    },
    validate: (value: any) => !!value || 'Enter password',
  },
};

export default writeConfig;
