import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Employee } from '../../Interfaces/employeeInterface';
import { Observable } from 'rxjs';
import { RegisterNewUserService } from '../../services/Register/register-new-user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { userIDService } from '../../services/Signals/userID';

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

  constructor(private employeeService: RegisterNewUserService, private router: Router, private idService:userIDService) {}
  employee$!: Observable<Employee>;
  onFormSubmit(){
    const emp_id = Number(this.loginForm.value.emp_id)
    const username = this.loginForm.value.username
    this.employee$ =  this.employeeService.getUser(emp_id)
    if(this.employee$ === null) {
      this.isLoginCredentialsCorrect = false 
    }
    else {
      this.employee$.subscribe(data => {
        if(data.empId === emp_id && data.username === username) {
          this.isLoginCredentialsCorrect = true

          this.user_id = data.empId;
          console.log("sending from log in to home")
          console.log(this.user_id)
          this.idService.setID(data.empId);
          this.router.navigate(['/home']);
          
          console.log(data);
        }else{
          this.isLoginCredentialsCorrect = false
        }
    })
    }
  }
}
