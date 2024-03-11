import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import updateLocale from 'dayjs/plugin/updateLocale';
import isToday from 'dayjs/plugin/isToday';
import isBetween from 'dayjs/plugin/isBetween';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

const configDayJS = () => {
  dayjs.extend(isToday);
  dayjs.extend(weekOfYear);
  dayjs.extend(isBetween);
  dayjs.extend(updateLocale);
  dayjs.extend(LocalizedFormat);
  dayjs.updateLocale('en', {
    weekStart: 0,
  });
};

export default configDayJS;
