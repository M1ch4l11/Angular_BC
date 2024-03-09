export interface Employee {
  employeenumber: number;
  officecode: string;
  lastname: string;
  firstname: string;
  extension: string;
  email: string;
  reportsto: number | null;
  jobtitle: string;
}
