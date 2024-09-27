import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateSlideRequest } from 'src/app/layout/api/slide';

@Component({
  selector: 'app-update.slide.dialog',
  templateUrl: './update.slide.dialog.component.html',
  styleUrl: './update.slide.dialog.component.scss'
})
export class UpdateSlideDialogComponent implements OnInit {
  slideForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ){
    this.slideForm = this.fb.group({
      id: ['', Validators.required],
      nameUz: [''],
      nameEn: [''],
      nameRu: [''],
      nameUzRu: [''],
      nameKaa: [''], // Optional
      descriptionUz: [''],
      descriptionEn: [''],
      descriptionRu: [''],
      descriptionUzRu: [''],
      descriptionKaa: [''], // Optional
      photo: [null] // Optional for file upload
    });
  }

  ngOnInit(): void {
    this.slideForm.patchValue(this.config.data.slide);
  }

  onFileSelect(event: any): void {
    if (event.target.files[0]) {
      this.slideForm.patchValue({ photo: event.target.files[0] });
    }
  }

  onSubmit(){
    if(this.slideForm.valid){
      const updateSlideRequest: UpdateSlideRequest = this.slideForm.value;
      this.ref.close(updateSlideRequest);
    }
  }

  onCancel(): void {
    this.ref.close(null);
  }
}
