import { Component } from '@angular/core';
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
import { LocalStorageService } from '../../services/local-storage.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule,
    NgIf, ReactiveFormsModule, NgClass, JsonPipe, FileUploadModule, ToastModule, RouterLink,],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {
  form!: FormGroup;

  constructor(
    private authorService: AuthorService,
    private messageService: MessageService,
    private router: Router,
    private localStorageService: LocalStorageService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
    }, {});
  }

  async onSubmit() {
    try {
      let result = await lastValueFrom(this.authorService.logIn(
        this.form.get('email')?.value,
        this.form.get('password')?.value
      ))
      console.log(result);
      this.localStorageService.setSession(result.sessionId);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.log(error);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
    };
  }

  isFieldValid(name: string) {
    let field = this.form.get(name);
    let error = field?.errors;
    return !field?.dirty || error == null;
  }
}
