import { ProjectType } from 'src/types/enums';

export enum Budget {
  no = 'No budget',
  hourByProject = 'Hours by project',
  fee = 'Fee by project',
  hourly = 'Hourly rate',
}

export const BUDGET_VALUE = {
  0: Budget.no,
  1: Budget.hourByProject,
  2: Budget.fee,
  3: Budget.hourly,
};

export interface ProjectInfo {
  id: string;
  name: string;
  color?: string;
  budget?: Budget; // enum
  type: ProjectType;
  tags?: string[];
  note?: string;
  isTentative: boolean;
  client?: string;
  owner?: string;
}

export interface ProjectMember {
  id: string;
  name: string;
  email: string;
  department: string;
}

export interface ProjectMileStone {
  name: string;
  startDate: string;
  endDate: string;
}

export interface ProjectTask {
  id: number;
  name: string;
  isBillable: boolean;
}
