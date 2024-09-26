import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateLocationRequest, UpdateLocationRequest } from 'src/app/layout/api/location';
import { LocationService } from 'src/app/layout/service/location.service';

@Component({
  selector: 'app-update.address.dialog',
  templateUrl: './update.address.dialog.component.html',
  styleUrl: './update.address.dialog.component.scss'
})
export class UpdateAddressDialogComponent implements OnInit {
  locationForm: FormGroup;
  locationData: UpdateLocationRequest;

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ){
    this.locationForm = this.fb.group({
      id: ['', Validators.required],
      nameUz: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameRu: ['', Validators.required],
      nameUzRu: ['', Validators.required],
      nameKaa: ['', Validators.required],
      latitude: ['', [Validators.required]],
      longitude: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.setDefaultvalue();
  }

  setDefaultvalue(){
    if(this.config.data.address){
      this.locationForm.patchValue(this.config.data.address);
    }
  }

  onSubmit(){
    if(this.locationForm.valid){
      const updateLocationRequest: UpdateLocationRequest = this.locationForm.value;
      this.ref.close(updateLocationRequest);
    }
  }

  onCancel(){
    this.ref.close();
  }
}
