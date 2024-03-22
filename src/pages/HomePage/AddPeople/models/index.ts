export interface PersonInfo{
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
}

export interface Availability{
    startDate: string;
    endDate?: string;
    workingType: WorkingType;
    publicHoliday?: string;
    note?: string;
}

export enum WorkingType{
    partTime = 'Part-time', fullTime = 'Full-time'
}

export enum AccountType{
    member, manager, admin
}

export enum ContractType{
    employee, contractor, placeholder
}

