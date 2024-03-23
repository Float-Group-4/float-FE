export interface PersonInfo {
  id: string;
  name: string;
  email?: string;
  role?: string;
  department?: string;
  tags?: string[];
  type: ContractType; // Employee, Contractor, Placeholder;
  hourlyRate?: number;
  accountType: AccountType;
  availability: Availability;
  projects?: string[];
  manages?: string[]; // user name
}

export interface Availability {
  startDate: string;
  endDate?: string;
  workingType: WorkingType;
  publicHoliday?: string;
  note?: string;
}

export enum WorkingType {
  partTime = 'Part-time',
  fullTime = 'Full-time',
}

export enum AccountType {
  member = 'Member',
  manager = 'Manager',
  admin = 'Admin',
  none = '',
}

export enum ContractType {
  employee = 'employee',
  contractor = 'contractor',
  placeholder = 'placeholder',
}
