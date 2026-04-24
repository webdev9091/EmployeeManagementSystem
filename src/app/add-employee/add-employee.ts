import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../navbar/navbar';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [Navbar, CommonModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  employee = signal<Omit<Employee, 'empNo'>>({
    empName: '',
    empEmail: '',
    empMobile: '',
    location: '',
    salary: 0,
  });

  isSubmitting = signal(false);
  employeeService = inject(EmployeeService);
  router = inject(Router);

  addEmployee() {
    const emp = this.employee();

    // Validation
    if (!emp.empName || !emp.empEmail || !emp.empMobile || !emp.location || emp.salary <= 0) {
      alert('Please fill in all fields with valid values');
      return;
    }

    this.isSubmitting.set(true);
    console.log('Adding employee with data:', emp);

    this.employeeService.addEmployee(emp as Employee).subscribe({
      next: (addedEmployee) => {
        console.log('Employee added successfully:', addedEmployee);
        alert('Employee added successfully!');
        this.isSubmitting.set(false);
        // Navigate back to home/employee list
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error adding employee:', error);
        alert('Error adding employee: ' + error.message);
        this.isSubmitting.set(false);
      },
    });
  }

  resetForm() {
    this.employee.set({
      empName: '',
      empEmail: '',
      empMobile: '',
      location: '',
      salary: 0,
    });
  }
}
