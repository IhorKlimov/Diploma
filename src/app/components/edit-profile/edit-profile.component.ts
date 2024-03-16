import { Component, OnInit } from '@angular/core';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../interfaces/author';
import { AppStateService } from '../../services/app-state.service';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { Router, RouterLink } from '@angular/router';
import { ImageCroppedEvent, ImageCropperModule, base64ToFile } from 'ngx-image-cropper';
import { DialogModule } from 'primeng/dialog';
import { lastValueFrom } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { FileStorageService } from '../../services/file-storage.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule,
    NgIf, ReactiveFormsModule, NgClass, JsonPipe, FileUploadModule, RouterLink, ImageCropperModule,
    DialogModule,],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit {
  user: Author | null = null;

  constructor(
    private authorService: AuthorService,
    private appStateService: AppStateService,
    private router: Router,
    private localStorageService: LocalStorageService,
    private fileStorageService: FileStorageService,
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      photo: new FormControl(null, []),
      originalPhoto: new FormControl(null, []),
      photoFile: new FormControl(null, []),
      userName: new FormControl("", [Validators.required]),
    }, {});

    this.authorService.getUser(null, localStorage.getItem('session')).subscribe(
      {
        next: (u) => {
          this.user = u;
          this.form.get('userName')?.setValue(u.userName);
          this.form.get('photo')?.setValue(u.imageUrl);
        },
        error: (error) => this.appStateService.setError(error.error),
      }
    );
  }


  showCropModal = false;
  form!: FormGroup;
  imageChangedEvent: any = '';
  originalFile: File | null = null;
  croppedImageBase64: any = '';
  passwordRegex = new RegExp("^((?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\\W]).{8,})$");

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

  async onSubmit() {
    try {
      let photo = this.form.get('photoFile')?.value;
      if (photo != null) {
        let fileUploadResult = await lastValueFrom(this.fileStorageService.uploadFile(photo));
        photo = fileUploadResult.imageUrl;
      }

      const sessionId = localStorage.getItem('session');

      if (sessionId != null) {
        let result = await lastValueFrom(this.authorService.updateUser(
          this.form.get('userName')?.value,
          photo,
          sessionId,
        ));

        this.appStateService.setMessage(result.status);
        this.appStateService.setUserUpdated();
      }
    } catch (error: any) {
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
