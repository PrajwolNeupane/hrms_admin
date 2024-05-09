interface AdminDashboardData {
  employeeCount: number;
  employeesPresentToday: number;
  employeesAbsentToday: number;
  totalHoursThisWeek: number;
  employeeCreated: number[];
  employeeAttendance: number[];
  employeeWorkHour: number[];
}

export type { AdminDashboardData };

export interface Employee {
  _id: string;
  first_name: string;
  middle_name: any;
  last_name: string;
  email: string;
  phone: any;
  gender: string;
  photo: string;
  dob: string;
  address: string;
  roles: Role[];
  salary: number;
  pan_number: string;
  date_joined: string;
  isDeleted: boolean;
  __v: number;
  bank?: Bank;
}

export interface Role {
  _id: string;
  name: string;
  date_joined: string;
  __v: number;
}

export interface Bank {
  name: string;
  account_number: string;
  branch: string;
}

export interface AttendaceLog {
  clockIn: string;
  clockOut: string;
  createdAt: string;
  timeDifference: string;
  employee: {
    address: string;
    date_joined: string;
    dob: string;
    email: string;
    first_name: string;
    gender: string;
    isDeleted: boolean;
    last_name: string;
    middle_name: string | null;
    pan_number: string;
    password: string;
    phone: string | null;
    photo: string;
    roles: Role[];
    salary: number;
    __v: number;
    _id: string;
  };
}

export interface EmployeePerfomance {
  first_name: string;
  middle_name: string | null;
  last_name: string;
  photo: string;
  role: string[];
  email: string;
  id: string;
  totalWorkedTime: string;
  totalWorkedTimeThisMonth: string;
  averageWorkedTime: string;
  totalAbsentThisMonth: number;
}
