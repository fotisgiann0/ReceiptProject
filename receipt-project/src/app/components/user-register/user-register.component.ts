import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  registerForm = new FormGroup({
    emp_id: new FormControl('', [Validators.required, Validators.pattern('[0-9]')]),
    username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]')]),
    firstname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z]')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('[a-zA-z]')])
  });

  
  onFormSubmit () {
    const newUser = {
      emp_id: Number(this.registerForm.value.emp_id),
      username: this.registerForm.value.username,
      firstname: this.registerForm.value.firstname,
      lastname: this.registerForm.value.lastname
    }
    //something
    this.registerForm.reset();
  }
}
