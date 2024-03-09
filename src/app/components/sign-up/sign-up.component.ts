import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { AuthorService } from '../../services/author.service';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { lastValueFrom } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule,
    NgIf, ReactiveFormsModule, NgClass, JsonPipe, FileUploadModule, ToastModule, RouterLink,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
  providers: [MessageService]
})
export class SignUpComponent {
  form!: FormGroup;
  passwordRegex = new RegExp("^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,})$");

  constructor(private authorService: AuthorService, private messageService: MessageService, private router: Router,) { }

  ngOnInit() {
    this.form = new FormGroup({
      photo: new FormControl(null, []),
      userName: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required, this.passwordValidator()]),
      confirmPassword: new FormControl("", [Validators.required, this.passwordValidator()])
    }, { validators: this.matchingPasswordsValidator });
  }

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let isValid = this.passwordRegex.test(control.value);
      return isValid ? null : { passwordValidator: "Wrong password" };
    };
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
    return password != confirmPassword ? { matchingPasswords: "Passwords don't match" } : null;
  };

  async onSubmit() {
    try {
      let result = await lastValueFrom(this.authorService.createAuthor(
        this.form.get('userName')?.value,
        this.form.get('email')?.value,
        this.form.get('password')?.value,
        ""
      ))
      console.log(result);
      localStorage.setItem("session", result.sessionId);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.log(error)
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
    };
  }

  onUpload(event: FileUploadEvent) {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }

}
