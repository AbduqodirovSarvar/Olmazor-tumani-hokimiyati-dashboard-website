import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAboutResponse, UpdateAboutCommand } from 'src/app/layout/api/about';
import { LocationResponse } from 'src/app/layout/api/location';
import { LocationService } from 'src/app/layout/service/location.service';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { AboutService } from 'src/app/layout/service/about.service';

@Component({
  selector: 'app-update.about.dialog',
  templateUrl: './update.about.dialog.component.html',
  styleUrl: './update.about.dialog.component.scss'
})
export class UpdateAboutDialogComponent {
  locations: LocationResponse[] = [];
  aboutForm: FormGroup;
  currentData: GetAboutResponse;

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private locationService: LocationService,
    private aboutService: AboutService
  ) {
    aboutService.getAboutById(config.data.id).subscribe({
      next: (data: GetAboutResponse) => {
        this.currentData = data;
        console.log(this.currentData);
        this.aboutForm.patchValue(data);
      },
      
      error: (error: Error) => {
        console.log(error);
      }
    });
    
    this.aboutForm = this.fb.group({
      id: ['', Validators.required],
      descriptionUz: ['', Validators.required],
      descriptionEn: ['', Validators.required],
      descriptionRu: ['', Validators.required],
      descriptionUzRu: ['', Validators.required],
      descriptionKaa: ['', Validators.required],
      locationId: ['', Validators.required],
      receptionTimeUz: ['', Validators.required],
      receptionTimeEn: ['', Validators.required],
      receptionTimeRu: ['', Validators.required],
      receptionTimeUzRu: ['', Validators.required],
      receptionTimeKaa: ['', Validators.required]
    });
    
    this.locationService.getAllLocations().subscribe({
      next: (data: LocationResponse[]) => {
        this.locations = data;
      },
      error: (error: Error) => {
        console.log(error);
      }
     });
  }

  onSave() {
    if (this.aboutForm.valid) {
      const formData: UpdateAboutCommand = this.aboutForm.value;
      
      this.ref.close(formData);
    }
  }

  onCancel() {
    this.ref.close(null);
  }
}
