import { Item } from './item.interface';

export interface TimeOffItem extends Item {
  id: string;
  name: string;
  userIds: string[];
  startDate: string;
  endDate: string;
  creator_id?: string;
  isPlaceHolder: boolean;
  columnsById?: any;
  parent_item?: {
    id: number;
    group: {
      color: string;
    };
  };
  type: string;
  startTime?: Date | number;
  endTime?: Date | number;
  reason: string; // reason for type off
  isTentative: boolean;
  note?: string;
}
