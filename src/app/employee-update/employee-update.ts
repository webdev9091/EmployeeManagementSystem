import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-update',
  imports: [Navbar, CommonModule],
  templateUrl: './employee-update.html',
  styleUrl: './employee-update.css',
})
export class EmployeeUpdate {
  @Input() empNo!: number;

  employee$: Observable<Employee> | null = null;

  employeeService: EmployeeService = inject(EmployeeService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empNo'] && this.empNo) {
      console.log('EmployeeView empNo changed to:', this.empNo);
      this.employee$ = this.employeeService.getEmployeeById(this.empNo);
    }
  }
}
