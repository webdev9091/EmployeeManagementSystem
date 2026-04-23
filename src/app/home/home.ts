import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { EmployeeList } from '../employee-list/employee-list';

@Component({
  selector: 'app-home',
  imports: [Navbar, EmployeeList],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
