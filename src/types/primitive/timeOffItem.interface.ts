export interface TimeOffItem {
  id: string;
  name: string;
  userIds: string[];
  startDate: string;
  endDate: string;
  notes: string;
  creator_id?: string;
  isPlaceHolder: boolean;
  columnsById?: any;
  parent_item?: {
    id: number;
    group: {
      color: string;
    };
  };
  type?: 'timeOffItem';
}
