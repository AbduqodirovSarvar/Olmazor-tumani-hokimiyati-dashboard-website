import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeResponse } from 'src/app/layout/api/employee';
import { LocationResponse } from 'src/app/layout/api/location';
import { UpdateSectorRequest } from 'src/app/layout/api/sector';

@Component({
  selector: 'app-update.sector.dialog',
  templateUrl: './update.sector.dialog.component.html',
  styleUrl: './update.sector.dialog.component.scss'
})
export class UpdateSectorDialogComponent implements OnInit {
  sectorForm: FormGroup;
  locations: LocationResponse[] =[];
  employees: EmployeeResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ){
    this.sectorForm = this.fb.group({
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
      employeeId: [''],
      locationId: [''],
      photo: [null] // Optional
    });
  }

  ngOnInit(): void {
    this.employees = this.config.data.employees;
    this.locations = this.config.data.locations;
    this.sectorForm.patchValue(this.config.data.sector);
  }

  onFileSelect(event: any): void {
    if (event.target.files[0]) {
      this.sectorForm.patchValue({ photo: event.target.files[0] });
    }
  }

  onSubmit(){
    if(this.sectorForm.valid){
      const updateSectorRequest: UpdateSectorRequest = this.sectorForm.value;
      this.ref.close(updateSectorRequest);
    }
  }

  onCancel(){
    this.ref.close(null);
  }
}
