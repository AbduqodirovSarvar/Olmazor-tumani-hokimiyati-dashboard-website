import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreatePostRequest } from 'src/app/layout/api/post';
import { PostService } from 'src/app/layout/service/post.service';

@Component({
  selector: 'app-create.post.dialog',
  templateUrl: './create.post.dialog.component.html',
  styleUrl: './create.post.dialog.component.scss'
})
export class CreatePostDialogComponent implements OnInit {
  postForm: FormGroup;
  locations: any[] = []; // Load your location data here

  constructor(
    private fb: FormBuilder,
    public dialogRef: DynamicDialogRef
  ) {
    this.postForm = this.fb.group({
      NameUz: ['', Validators.required],
      NameEn: ['', Validators.required],
      NameRu: ['', Validators.required],
      NameUzRu: ['', Validators.required],
      NameKaa: [''],
      DescriptionUz: ['', Validators.required],
      DescriptionEn: ['', Validators.required],
      DescriptionRu: ['', Validators.required],
      DescriptionUzRu: ['', Validators.required],
      DescriptionKaa: [''],
      Photo: [null, Validators.required],
    });
  }

  ngOnInit(): void {
  }

  onFileChange(event: any){
    if(event.target.files.length > 0){
      this.postForm.patchValue({ Photo: event.target.files[0] });
    }
  }

  onAdd() {
    if (this.postForm.valid) {
      const postData: CreatePostRequest = this.postForm.value;
      this.dialogRef.close(postData);
    }
  }

  onCancel() {
    this.dialogRef.close(null); // Close the dialog without returning data
  }
}