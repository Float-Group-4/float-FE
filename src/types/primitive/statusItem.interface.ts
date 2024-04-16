import { Item } from './item.interface';

export interface StatusItem extends Item {
  id: string;
  statusTypeId?: string;
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
}
