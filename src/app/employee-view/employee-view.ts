import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../models/employee.model';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-employee-view',
  imports: [Navbar, CommonModule],
  templateUrl: './employee-view.html',
  styleUrl: './employee-view.css',
})
export class EmployeeView implements OnChanges {
  @Input() empNo!: number;

  employee$: Observable<Employee> | null = null;
  employeeService: EmployeeService = inject(EmployeeService);

  ngOnChanges(changes: SimpleChanges) {
    // Detect when empNo input changes (from route parameter binding)
    if (changes['empNo'] && this.empNo) {
      console.log('EmployeeView empNo changed to:', this.empNo);
      this.employee$ = this.employeeService.getEmployeeById(this.empNo);
    }
  }
}
