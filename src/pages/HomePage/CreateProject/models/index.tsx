import { ProjectType } from "src/types/enums";

export const BUDGET_VALUE = {
    0: 'No budget',
    1: 'Hours by project',
    2: 'Fee by project',
    3: 'Hourly rate',
  };

export interface ProjectInfo{
    id: string,
    name: string,
    color?: string,
    budget?: number, // enum
    type: ProjectType,
    tags?: string[],
    note?: string,
    isTentative: boolean,
    client?: string,
    owner?: string,
}

export interface ProjectTeam {
    member: Member,
}

export interface Member{
    id: string,
   name: string,
   email: string,
}

export interface ProjectMileStone{
    name: string,
    startDate: string,
    endDate: string
}

export interface ProjectTask{
    id: number,
    name: string,
    isBillable: boolean
}






