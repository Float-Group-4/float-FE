import { ReactNode, useEffect } from 'react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import useConfig from '@base/hooks/useConfig';
// import { useAppSetting } from '@base/hooks/user-setting/useAppSetting';
import 'dayjs/locale/ko';
import 'dayjs/locale/en';
import { DefaultConfigProps } from '@base/types/config';
import React from 'react';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  children: ReactNode;
}

const Locales = ({ children }: Props) => {
  const { initAppSetting } = useConfig();

  dayjs.tz.setDefault('Asia/Seoul');

  return <>{children}</>;
};

export default Locales;
