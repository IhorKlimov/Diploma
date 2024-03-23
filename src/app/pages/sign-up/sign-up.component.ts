import { Component, OnInit } from '@angular/core';
import { Button, ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { AuthorService } from '../../services/author.service';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { lastValueFrom } from 'rxjs';
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { AppStateService } from '../../services/app-state.service';
import { NgModule } from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { DomSanitizer } from '@angular/platform-browser';
import { DialogModule } from 'primeng/dialog';
import { FileStorageService } from '../../services/file-storage.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule,
    NgIf, ReactiveFormsModule, NgClass, JsonPipe, FileUploadModule, RouterLink, ImageCropperModule,
    DialogModule,],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  showCropModal = false;
  form!: FormGroup;
  imageChangedEvent: any = '';
  originalFile: File | null = null;
  croppedImageBase64: any = '';
  passwordRegex = new RegExp("^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,})$");

  constructor(
    private authorService: AuthorService,
    private appStateService: AppStateService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private fileStorageService: FileStorageService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      photo: new FormControl(null, []),
      originalPhoto: new FormControl(null, []),
      photoFile: new FormControl(null, []),
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
      let photo = this.form.get('photoFile')?.value;
      if (photo != null) {
        let fileUploadResult = await lastValueFrom(this.fileStorageService.uploadFile(photo));
        photo = fileUploadResult.imageUrl;
        console.log(fileUploadResult);
      }

      let result = await lastValueFrom(this.authorService.createAuthor(
        this.form.get('userName')?.value,
        this.form.get('email')?.value,
        this.form.get('password')?.value,
        photo,
      ));

      this.localStorageService.setSession(result.sessionId);
      this.router.navigate(['/']);
    } catch (error: any) {
      console.log(error)
      this.appStateService.setError(error.error);
    };
  }

  fileChangeEvent(event: any): void {
    this.showCropModal = true;
    this.originalFile = event.currentTarget.files[0];
    this.imageChangedEvent = event;
  }

  onHideDialog() {
    this.form.get('originalPhoto')?.setValue(null);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImageBase64 = event.base64;
  }

  cropImage() {
    this.form.get('photo')?.setValue(this.croppedImageBase64);

    const fileBlob = base64ToFile(this.croppedImageBase64);
    const file: File = new File([fileBlob], this.originalFile!.name, { lastModified: this.originalFile!.lastModified, type: this.originalFile!.type });
    this.form.get('photoFile')?.setValue(file);

    this.showCropModal = false;
  }

  cancelPhoto() {
    this.form.get('photo')?.setValue(null);
    this.form.get('photoFile')?.setValue(null);
  }

}
