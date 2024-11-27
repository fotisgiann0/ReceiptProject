import { Injectable } from '@angular/core';
import { Employee } from '../../Interfaces/employeeInterface';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterNewUserService {

  constructor(private http: HttpClient) { }

  
  postUser(employee: Employee) {
    console.log(employee)
    return this.http.post<Employee>("https://localhost:7006/users/", employee)
    .subscribe(data => {
      console.log(data);
    });
  }

  getUser(emp_id: number) { //: Observable<Employee>
    return this.http.get<Employee>(`https://localhost:7006/users/${emp_id}`);
  }
  
}