import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateAboutCommand } from 'src/app/layout/api/about';
import { LocationResponse } from 'src/app/layout/api/location';
import { LocationService } from 'src/app/layout/service/location.service';

@Component({
  selector: 'app-create.about.dialog',
  templateUrl: './create.about.dialog.component.html',
  styleUrl: './create.about.dialog.component.scss'
})
export class CreateAboutDialogComponent implements OnInit {
  locations: LocationResponse[] = [];
  aboutForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private locationService: LocationService
  ) {
    // Initialize the form with required fields
    this.aboutForm = this.fb.group({
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
  }

  ngOnInit(): void {
    this.locationService.getAllLocations().subscribe({
      next: (data: LocationResponse[]) => {
        this.locations = data;
      },
      error: (error: Error) => {
        console.log(error);
      }
     });
  }

  onAdd() {
    if (this.aboutForm.valid) {
      const formData: CreateAboutCommand = this.aboutForm.value;
      
      this.ref.close(formData); // Close dialog and return the form data
    }
  }

  onCancel() {
    this.ref.close(null); // Close dialog without returning anything
  }

}
