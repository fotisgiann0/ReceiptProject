import { Injectable } from '@angular/core';
import { Employee } from '../../Interfaces/employeeInterface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterNewUserService {
  private apiUrl = 'https://localhost:7006/users';
  constructor(private http: HttpClient) { }

  postUser(employee: Employee) {
    return this.http.post<Employee>("https://localhost:7006/users/", employee);
  }

  getUser(empId: number) {
    return this.http.get<Employee>(`${this.apiUrl}/${empId}`);
  }
  
  async getUserForLogin(empID: number): Promise<Observable<Employee>>{
    return await this.http.get<Employee>(`https://localhost:7006/users/${empID}`);
  }


}