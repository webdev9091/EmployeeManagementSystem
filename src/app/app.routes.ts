import { Routes } from '@angular/router';
import { Home } from './home/home';
import { AddEmployee } from './add-employee/add-employee';
import { EmployeeView } from './employee-view/employee-view';
import { EmployeeUpdate } from './employee-update/employee-update';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home Page',
  },
  {
    path: 'add-employee',
    component: AddEmployee,
    title: 'Add Employee',
  },
  {
    path: 'view-employee/:empNo',
    component: EmployeeView,
    title: 'View Employee',
  },
  {
    path: 'update-employee/:empNo',
    component: EmployeeUpdate,
    title: 'Update Employee',
  },
];
