import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private http = inject(HttpClient);

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:1919/employees');
  }

  getEmployeeById(empNo: any): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:1919/employee?empId=${empNo}`);
  }

  updateEmployee(employee: Employee) {
    return this.http.put<Employee>(`http://localhost:1919/update-employee`, employee);
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>('http://localhost:1919/add-employee', employee);
  }

  deleteEmployee(empNo: any) {
    return this.http.delete(`http://localhost:1919/delete-employee?empId=${empNo}`);
  }
}
