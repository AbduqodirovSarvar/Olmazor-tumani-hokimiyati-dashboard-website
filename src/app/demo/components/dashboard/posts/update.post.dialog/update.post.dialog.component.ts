import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { el } from '@fullcalendar/core/internal-common';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostResponse, UpdatePostRequest } from 'src/app/layout/api/post';
import { BaseApiService } from 'src/app/layout/service/base.api.service';

@Component({
  selector: 'app-update.post.dialog',
  templateUrl: './update.post.dialog.component.html',
  styleUrls: ['./update.post.dialog.component.scss'] // fixed typo 'styleUrl' to 'styleUrls'
})
export class UpdatePostDialogComponent implements OnInit {
  updatePostForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef,
    private baseApiService: BaseApiService
  ) {
    this.updatePostForm = this.fb.group({
      id: ['', Validators.required],            // Changed 'Id' to 'id'
      nameUz: [null],                           // Changed 'NameUz' to 'nameUz'
      nameEn: [null],                           // Changed 'NameEn' to 'nameEn'
      nameRu: [null],                           // Changed 'NameRu' to 'nameRu'
      nameUzRu: [null],                         // Changed 'NameUzRu' to 'nameUzRu'
      nameKaa: [null],                          // Changed 'NameKaa' to 'nameKaa'
      descriptionUz: [null],                    // Changed 'DescriptionUz' to 'descriptionUz'
      descriptionEn: [null],                    // Changed 'DescriptionEn' to 'descriptionEn'
      descriptionRu: [null],                    // Changed 'DescriptionRu' to 'descriptionRu'
      descriptionUzRu: [null],                  // Changed 'DescriptionUzRu' to 'descriptionUzRu'
      descriptionKaa: [null],                   // Changed 'DescriptionKaa' to 'descriptionKaa'
      photo: [null],                          // Changed 'Photo' to 'photo'
      images: [null],                          // Changed 'Images' to 'images'
      deletingImages: [null]                    // Changed 'DeletingImages' to 'deletingImages'
    });
  }

  ngOnInit(): void {
    if (this.config.data.post) {
      this.setdefaultValue(this.config.data.post);
    }
  }

  setdefaultValue(data: PostResponse) {
    this.updatePostForm.patchValue(data);
    this.updatePostForm.get('photo')?.setValue(null);
  }
  

  onUpdate() {
    if (this.updatePostForm.valid) {
      const postData: UpdatePostRequest = this.updatePostForm.value; // Get the form values
      this.dialogRef.close(postData);
      this.updatePostForm.reset();
       // Close the dialog and send the form data
    }else{
      console.error('Form is invalid'); // Display an error message if the form is invalid
    }
  }

  onCancel() {
    this.dialogRef.close(null); // Close the dialog without saving
  }

  onSelectImage(image: any) {
    const deletingImages = this.updatePostForm.get('deletingImages')?.value || [];
    const isAlreadySelected = deletingImages.includes(image.name); // Check by ID
  
    if (isAlreadySelected) {
      const updatedList = deletingImages.filter((imgId: any) => imgId !== image.name);
      this.updatePostForm.patchValue({ deletingImages: updatedList });
    } else {
      this.updatePostForm.patchValue({ deletingImages: [...deletingImages, image.name] });
    }
  }  

  isVideoFile(fileName: string): boolean {
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    if(!fileName){
      return false;
    }
    return videoExtensions.some(ext => fileName.toLowerCase().endsWith(ext));
  }

  getMedia(id: string): string {
    return this.baseApiService.getPhoto(id);
  }
  

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0]; // Get the selected file
      this.updatePostForm.patchValue({ photo: file }); // Update the 'photo' form control with the file
    }
  }

  onFileChange2(event: any) {
    if (event.target.files.length > 0) {
      const files: File[] = Array.from(event.target.files); // Convert FileList to an array
      this.updatePostForm.patchValue({ images: files }); // Store files in the form control
    }
  }

  onDeleteImage(index: number) {
    const images = this.updatePostForm.get('images')?.value;
    images.splice(index, 1); // Remove the selected image from the array
    this.updatePostForm.patchValue({ images: [...images] }); // Update the form control with the modified array
  }

}
