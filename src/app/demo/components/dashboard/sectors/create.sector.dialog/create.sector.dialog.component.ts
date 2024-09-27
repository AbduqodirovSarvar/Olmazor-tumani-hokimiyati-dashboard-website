import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeResponse } from 'src/app/layout/api/employee';
import { LocationResponse } from 'src/app/layout/api/location';
import { CreateSectorRequest } from 'src/app/layout/api/sector';

@Component({
  selector: 'app-create.sector.dialog',
  templateUrl: './create.sector.dialog.component.html',
  styleUrl: './create.sector.dialog.component.scss'
})
export class CreateSectorDialogComponent implements OnInit {
  sectorForm: FormGroup;
  locations: LocationResponse[] =[];
  employees: EmployeeResponse[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ){
    this.sectorForm = this.fb.group({
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
      employeeId: ['', Validators.required], // Employee UUID is required
      locationId: ['', Validators.required], // Location UUID is required
      photo: [null] // Optional
    });
  }

  ngOnInit(): void {
    this.locations = this.config.data.locations;
    this.employees = this.config.data.employees;
  }

  onSubmit(){
    if(this.sectorForm.valid){
      const createSectorRequest: CreateSectorRequest = this.sectorForm.value;
      this.ref.close(createSectorRequest);
    }
  }

  onCancel(){
    this.ref.close(null);
  }

  onFileSelect(event: any): void {
    if (event.target.files[0]) {
      this.sectorForm.patchValue({ photo: event.target.files[0] });
    }
  }
}
