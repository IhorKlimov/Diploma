import { JsonPipe, NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { EditorInitEvent, EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { lastValueFrom } from 'rxjs';
import { AppStateService } from '../../services/app-state.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { RecipeService } from '../../services/recipe.service';
import { FileStorageService } from '../../services/file-storage.service';
import { ImageCroppedEvent, ImageCropperModule, base64ToFile } from 'ngx-image-cropper';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, PasswordModule, ImageCropperModule, DialogModule,
    NgIf, ReactiveFormsModule, NgClass, JsonPipe, FileUploadModule, RouterLink, EditorModule,],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.css',
})
export class CreateRecipeComponent implements OnInit {
  form!: FormGroup;
  showCropModal = false;
  imageChangedEvent: any = '';
  originalFile: File | null = null;
  croppedImageBase64: any = '';

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private recipeService: RecipeService,
    private appStateService: AppStateService,
    private fileStorageService: FileStorageService,
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      photo: new FormControl(null, []),
      originalPhoto: new FormControl(null, []),
      photoFile: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
      text: new FormControl(null, [Validators.required]),
    }, {});
  }

  async onSubmit() {
    try {
      let photo = this.form.get('photoFile')?.value;
      let fileUploadResult = await lastValueFrom(this.fileStorageService.uploadFile(photo));

      const response = await lastValueFrom(this.recipeService.createRecipe(
        this.form.get('title')?.value,
        this.form.get('text')?.value,
        fileUploadResult.imageUrl,
      ));

      this.router.navigate([`recipe/${response.recipeId}`]);
      this.appStateService.setMessage('Created a new recipe');
    } catch (error: any) {
      this.appStateService.setError(error.error);

      if (error.status == 401) {
        this.localStorageService.setSession(null);
        this.router.navigate(['/']);
      }
    }
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
