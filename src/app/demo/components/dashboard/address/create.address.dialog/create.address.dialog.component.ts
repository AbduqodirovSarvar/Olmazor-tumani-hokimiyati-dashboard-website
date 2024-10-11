import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateLocationRequest } from 'src/app/layout/api/location';
import { LocationService } from 'src/app/layout/service/location.service';

@Component({
  selector: 'app-create.address.dialog',
  templateUrl: './create.address.dialog.component.html',
  styleUrl: './create.address.dialog.component.scss'
})
export class CreateAddressDialogComponent {
  locationForm: FormGroup;

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
  ) {
    this.locationForm = this.fb.group({
      nameUz: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameRu: ['', Validators.required],
      nameUzRu: ['', Validators.required],
      nameKaa: ['', Validators.required],
      latitude: ['', Validators.required],
      longitude: ['', Validators.required],
    });
  }

  onSubmit(){
    if(this.locationForm.valid){
      const createLocationRequest: CreateLocationRequest = this.locationForm.value;
      this.ref.close(createLocationRequest);
    }
  }


  onCancel(){
    this.ref.close(null);
  }

}
