import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { JsonPipe, NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule, NgIf, ReactiveFormsModule, NgClass, JsonPipe],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      userName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      confirmPassword: new FormControl("", [Validators.required])
    }, { validators: this.matchingPasswordsValidator });
  }

  isFieldValid(name: string) {
    let field = this.form.get(name);
    let error = field?.errors;
    return !field?.dirty || error == null;
  }

  passwordsDontMatch() {
    let error = this.form.errors;
    return error != null && error['matchingPasswords'] != null;
  }

  matchingPasswordsValidator: ValidatorFn = (
    control: AbstractControl,
  ): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    console.log(password, confirmPassword)
    return password != confirmPassword ? { matchingPasswords: "Passwords don't match" } : null;
  };

  onSubmit() {
    console.log("submit " + this.form.valid + " ")
  }


}
