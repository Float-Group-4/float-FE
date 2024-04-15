import { Dayjs } from 'dayjs';

export interface TimeOffTypeSetting {
  id: string;
  teamId: string;
  name: string;
  color: string;
  balance: string;
  days: number;
  EffectiveDate: Dayjs;
}
