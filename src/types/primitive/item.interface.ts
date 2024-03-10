export interface Item {
  id: number;
  name: string;
  userIds: string[];
  startDate: string;
  endDate: string;
  hour: number;
  creator_id?: string;
  created_at: Date;
  isPlaceHolder: boolean;
  board: { id: number; type: string };
  group: { id: number; color: string; title?: string };
  columnsById?: any;
  parent_item?: {
    id: number;
    group: {
      color: string;
    };
  };
}
