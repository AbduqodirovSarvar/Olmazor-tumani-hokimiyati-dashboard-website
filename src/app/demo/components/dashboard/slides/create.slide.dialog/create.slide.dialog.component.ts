import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateSlideRequest } from 'src/app/layout/api/slide';

@Component({
  selector: 'app-create.slide.dialog',
  templateUrl: './create.slide.dialog.component.html',
  styleUrl: './create.slide.dialog.component.scss'
})
export class CreateSlideDialogComponent {
  slideForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef
  ){
    this.slideForm = this.fb.group({
      nameUz: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameRu: ['', Validators.required],
      nameUzRu: ['', Validators.required],
      nameKaa: [''], // Optional
      descriptionUz: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      descriptionRu: ['', Validators.required],
      descriptionUzRu: ['', Validators.required],
      descriptionKaa: [''], // Optional
      photo: [null, Validators.required] // File upload is required
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files[0]) {
      this.slideForm.patchValue({ photo: event.target.files[0] });
    }
  }

  onSubmit(){
    if(this.slideForm.valid){
      const createSlideRequest: CreateSlideRequest = this.slideForm.value;
      this.ref.close(createSlideRequest);
    }
  }

  onCancel(): void {
    this.ref.close(null);
  }
}
