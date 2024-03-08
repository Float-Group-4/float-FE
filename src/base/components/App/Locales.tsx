import { ReactNode, useEffect } from 'react';

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

import 'dayjs/locale/ko';
import 'dayjs/locale/en';

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  children: ReactNode;
}

const Locales = ({ children }: Props) => {
  dayjs.tz.setDefault('Asia/Seoul');

  return <>{children}</>;
};

export default Locales;
