import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterNewUserService } from '../../services/Register/register-new-user.service';
import { Employee } from '../../Interfaces/employeeInterface';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent implements OnDestroy {
  registerForm = new FormGroup({
    emp_id: new FormControl('', [Validators.required, Validators.pattern('[0-100]')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]')]),
    firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z]')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z]')])
  });

  constructor(private employeeService: RegisterNewUserService, private router: Router) {}

  employee$!: Observable<Employee>;

  private subscription = new Subscription();

  onFormSubmit () {
    const newUser: Employee = {
      empId: Number(this.registerForm.value.emp_id),
      username: this.registerForm.value.username!,
      firstname: this.registerForm.value.firstname!,
      lastname: this.registerForm.value.lastname!
    }
    
    const responseSubscription = this.employeeService.postUser(newUser).subscribe(data => {
      console.log(data);
      this.registerForm.reset();
    });

    this.subscription.add(responseSubscription);

    this.router.navigate(['/login']);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
} 