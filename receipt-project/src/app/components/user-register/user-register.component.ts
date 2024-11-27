import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterNewUserService } from '../../services/Register/register-new-user.service';
import { Employee } from '../../Interfaces/employeeInterface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  registerForm = new FormGroup({
    emp_id: new FormControl('', [Validators.required, Validators.pattern('[0-100]')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]')]),
    firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z]')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z]')])
  });

  constructor(private employeeService: RegisterNewUserService) {}

  employee$!: Observable<Employee>;

  onFormSubmit () {
    const newUser: Employee = {
      empId: Number(this.registerForm.value.emp_id),
      username: this.registerForm.value.username!,
      firstname: this.registerForm.value.firstname!,
      lastname: this.registerForm.value.lastname!
    }
    //something
    console.log(newUser);
    this.employeeService.postUser(newUser);
    this.registerForm.reset();
  }
} 