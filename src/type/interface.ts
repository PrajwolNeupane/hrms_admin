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
