import { TextField } from '@mui/material';

import * as baseComponents from '@base/config/WriteField/components';
import { WriteConfig } from '@base/types/common';

import * as keyNames from './keyNames';

const writeConfig: WriteConfig = {
  [keyNames.KEY_NAME_TEAMNAME]: {
    languageKey: 'Team Name',
    Component: TextField,
    defaultValue: '',
    componentProps: {
      type: 'text',
      placeholder: 'Team name...',
    },
    validate: (value: any) => !!value || 'Enter name for your team before continue',
  },
};

export default writeConfig;
