import { Injectable } from '@angular/core';
import { ApiResponse, IEmployee } from '../pages/shared/models/Employee';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiurl = "http://localhost:4000/employee";
  
  constructor( private http: HttpClient ) { }

  getAllEmployees(): Observable<ApiResponse<IEmployee[]>> {
    return this.http.get<ApiResponse<IEmployee[]>>(`${this.apiurl}`, {responseType: 'json'})
  }

  getEmployee(id: string): Observable<ApiResponse<IEmployee>> {
    return this.http.get<ApiResponse<IEmployee>>(`${this.apiurl}/${id}`);
  }

  createEmployee(employee: IEmployee): Observable<any> {
    return this.http.post(`${this.apiurl}`, employee);
  }


  updateEmployee(id: string, employee: IEmployee): Observable<any> {
    return this.http.put(`${this.apiurl}/${id}`, employee);
  }

  deleteEmployee(id: string): Observable<ApiResponse<any>> {
    return this.http.delete<ApiResponse<any>>(`${this.apiurl}/${id}`);
  }

}
