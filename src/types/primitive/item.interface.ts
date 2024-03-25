export interface Item {
  id: string;
  name: string;
  userIds: string[];
  startDate: string;
  endDate: string;
  hour: number;
  creator_id?: string;
  isPlaceHolder: boolean;
  columnsById?: any;
  parent_item?: {
    id: number;
    group: {
      color: string;
    };
  };
  type?: 'item';
}
