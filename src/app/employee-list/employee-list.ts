import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  DestroyRef,
} from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Employee } from '../models/employee.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-employee-list',
  imports: [CommonModule, MatIconModule],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeList implements OnInit {
  employees = signal<Employee[]>([]);
  employeeService = inject(EmployeeService);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService
      .getAllEmployees()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (resp) => {
          this.employees.set(resp);
          console.log('Employees fetched successfully:', resp);
        },
        error: (err) => {
          console.error('Error fetching employees:', err);
        },
      });
  }

  deleteEmployee(empNo: any) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(empNo).subscribe({
        next: () => {
          alert('Employee deleted successfully!');
          this.getEmployees(); // Refresh the list after deletion
        },
        error: (err) => {
          console.error('Error deleting employee:', err);
          alert('Error deleting employee: ' + err.message);
        },
      });
    }
  }
}
