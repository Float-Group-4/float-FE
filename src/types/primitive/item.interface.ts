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
  type: string;
}

export interface AllocationItem extends Item {
  startTime?: Date | number;
  endTime?: Date | number;
  id: string;
  projectId: string;
  taskType: string; // tentative, completed
  note?: string;
}
