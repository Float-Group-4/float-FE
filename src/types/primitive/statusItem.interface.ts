export interface StatusItem {
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
}
