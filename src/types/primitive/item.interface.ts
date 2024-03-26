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

export interface AllocationItem extends Item{
  startTime?: Date | number;
  endTime?: Date | number;
  id: string;
  projectId: string;
  type: string; // tentative, completed
  note?: string;
}

export interface StatusItem extends Item{
  name: string;
}

export interface TimeOffItem extends Item{
  startTime?: Date | number;
  endTime?: Date | number;
  reason: string; // reason for type off
  isTentative: boolean;
  note?: string;
}