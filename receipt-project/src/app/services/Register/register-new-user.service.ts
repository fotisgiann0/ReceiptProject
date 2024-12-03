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
    console.log(employee)
    return this.http.post<Employee>("https://localhost:7006/users/", employee);
  }

  getUser(empId: number) {
    const token = localStorage.getItem('authToken');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get<Employee>(`${this.apiUrl}/${empId}`, { headers });
    
  }
  
  getUserForLogin(empID: number): Observable<Employee>{
    return this.http.get<Employee>(`https://localhost:7006/users/${empID}`);
  }


}