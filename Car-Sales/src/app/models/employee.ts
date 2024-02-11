export interface Employee {
  employeeNumber: number;
  officeCode: string;
  lastName: string;
  firstName: string;
  extension: string;
  email: string;
  reportsTo: number | null;
  jobTitle: string;
}
