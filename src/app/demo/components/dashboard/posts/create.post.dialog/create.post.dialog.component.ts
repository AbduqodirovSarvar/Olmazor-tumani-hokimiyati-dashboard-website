import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreatePostRequest } from 'src/app/layout/api/post';
import { PostService } from 'src/app/layout/service/post.service';

@Component({
  selector: 'app-create.post.dialog',
  standalone: true,
  imports: [],
  templateUrl: './create.post.dialog.component.html',
  styleUrl: './create.post.dialog.component.scss'
})
export class CreatePostDialogComponent implements OnInit {
  postForm: FormGroup;
  locations: any[] = []; // Load your location data here

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    public dialogRef: DynamicDialogRef// DialogRef<CreatePostDialogComponent>
  ) {
    this.postForm = this.fb.group({
      NameUz: ['', Validators.required],
      NameEn: ['', Validators.required],
      NameRu: ['', Validators.required],
      NameUzRu: ['', Validators.required],
      NameKaa: ['', Validators.required],
      DescriptionUz: ['', Validators.required],
      DescriptionEn: ['', Validators.required],
      DescriptionRu: ['', Validators.required],
      DescriptionUzRu: ['', Validators.required],
      DescriptionKaa: ['', Validators.required],
      Category: ['', Validators.required],
      Photo: [null] // For file uploads
    });
  }

  ngOnInit(): void {
    // Load locations if necessary
    this.loadLocations();
  }

  loadLocations() {
    // Implement logic to load locations here
    // e.g., this.locations = await this.locationService.getLocations();
  }

  onAdd() {
    if (this.postForm.valid) {
      const postData: CreatePostRequest = this.postForm.value;
      this.postService.createPost(postData).subscribe({
        next: () => {
          this.dialogRef.close(postData); // Close the dialog and return data
        },
        error: (error) => {
          console.error('Error creating post:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close(null); // Close the dialog without returning data
  }
}