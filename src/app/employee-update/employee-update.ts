import { Component, inject, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employee-update',
  imports: [Navbar, CommonModule],
  templateUrl: './employee-update.html',
  styleUrl: './employee-update.css',
})
export class EmployeeUpdate implements OnChanges {
  @Input() empNo!: number;

  employee = signal<Employee | null>(null);
  isLoading = signal(false);

  employeeService: EmployeeService = inject(EmployeeService);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['empNo'] && this.empNo) {
      console.log('EmployeeUpdate empNo changed to:', this.empNo);
      this.isLoading.set(true);
      this.employeeService.getEmployeeById(this.empNo).subscribe({
        next: (employee) => {
          this.employee.set(employee);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error fetching employee:', error);
          this.isLoading.set(false);
        },
      });
    }
  }

  updateEmployee() {
    const emp = this.employee();
    if (emp) {
      console.log('Updating employee with data:', emp);
      this.employeeService.updateEmployee(emp).subscribe({
        next: (updatedEmployee) => {
          console.log('Employee updated successfully:', updatedEmployee);
          this.employee.set(updatedEmployee);
          alert('Employee updated successfully!');
        },
        error: (error) => {
          console.error('Error updating employee:', error);
          alert('Error updating employee: ' + error.message);
        },
      });
    }
  }
}
