export interface DayOfWeek {
  name: string;
  hourPerDay: number;
  included: boolean;
}

var days: DayOfWeek[] = [
  {
    name: 'Sunday',
    hourPerDay: 8,
    included: false,
  },
  {
    name: 'Monday',
    hourPerDay: 8,
    included: true,
  },
  {
    name: 'Tuesday',
    hourPerDay: 8,
    included: true,
  },
  {
    name: 'Wednesday',
    hourPerDay: 8,
    included: true,
  },
  {
    name: 'Thursday',
    hourPerDay: 8,
    included: true,
  },
  {
    name: 'Friday',
    hourPerDay: 8,
    included: true,
  },
  {
    name: 'Saturday',
    hourPerDay: 8,
    included: false,
  },
];

export default days;
