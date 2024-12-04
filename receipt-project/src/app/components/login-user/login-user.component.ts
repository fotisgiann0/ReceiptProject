import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../Interfaces/employeeInterface';
import { Observable } from 'rxjs';
import { RegisterNewUserService } from '../../services/Register/register-new-user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { userIDService } from '../../services/Signals/userID';
import { HttpClient } from '@angular/common/http';
import { AuthGuard } from '../../services/Authentication/auth-guard.service';
import { AuthService } from '../../services/Authentication/auth-service.service';

@Component({
  selector: 'app-login-user',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css'
})
export class LoginUserComponent {
  loginForm = new FormGroup({
    emp_id: new FormControl('', [Validators.required, Validators.pattern('[0-100]')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]')])
  });
  
  isLoginCredentialsCorrect:boolean = false;

  user_id: number = 10;

  constructor(private employeeService: RegisterNewUserService, 
    private router: Router, 
    private idService:userIDService, 
    private http: HttpClient,
    private authService: AuthService) {}
  
    employee$!: Observable<Employee>;
  async onFormSubmit(){
    const emp_id = this.loginForm.value.emp_id
    const username = this.loginForm.value.username
    if ((emp_id === null || Number(emp_id) < 0)  || !username) {
      this.isLoginCredentialsCorrect = false;
      return;
    }
    
    this.employee$ =  await this.employeeService.getUserForLogin(Number(emp_id))
    
    if(this.employee$ === null || this.employee$ === undefined) {  
      this.isLoginCredentialsCorrect = false 
      return;
    }
    else {
      this.employee$.subscribe(data => {
        if(data.empId === Number(emp_id) && data.username === username) {
          this.isLoginCredentialsCorrect = true
          this.user_id = data.empId;
          this.idService.setID(data.empId);
        }else{
          this.isLoginCredentialsCorrect = false
          return;
        }
        
        if(this.isLoginCredentialsCorrect) {
          this.http.post<{ token: string }>('https://localhost:7006/login', { "username": `${username}`, "password": `${this.idService.userIDSignal()}`}).subscribe({
            next: (response) => {
              const token = response.token;
      
              // Store the token in localStorage
              if(localStorage) {
                localStorage.setItem('authToken', token);
                this.authService.currentUserTokenSignal.set(token);
        
                // Set login state and navigate to the home page
                this.isLoginCredentialsCorrect = true;
                this.router.navigate(['/home']);
              }
       
            },
            error: (err) => {
              console.error('Login failed', err);
              this.isLoginCredentialsCorrect = false;
            }
          });
        }
      })
    }
  }
  
  returnToWelcome() {
    this.router.navigate(['/']);
  }
}
