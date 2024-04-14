import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_SIGN_UP_FIRST_NAME]: {
    languageKey: 'First name',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      placeholder: 'Enter first name',
    },
    validate: (value: any) => !!value || 'Enter your first name',
  },
  [keyNames.KEY_NAME_SIGN_UP_LAST_NAME]: {
    languageKey: 'Last name',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      placeholder: 'Enter last name',
    },
    validate: (value: any) => !!value || 'Enter your last name',
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
