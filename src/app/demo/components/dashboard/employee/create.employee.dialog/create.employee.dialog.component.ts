import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeCreateRequest } from 'src/app/layout/api/employee';
import { EnumResponse } from 'src/app/layout/api/enum';

@Component({
  selector: 'app-create.employee.dialog',
  templateUrl: './create.employee.dialog.component.html',
  styleUrl: './create.employee.dialog.component.scss'
})
export class CreateEmployeeDialogComponent {
  employeeForm: FormGroup;
  genders: EnumResponse[] = [];
  categories: EnumResponse[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) {
    this.employeeForm = this.fb.group({
      FirstnameEn: ['', Validators.required],
      FirstnameRu: ['', Validators.required],
      LastnameEn: ['', Validators.required],
      LastnameRu: ['', Validators.required],
      Gender: [null], // Optional
      Phone1: [''],
      Phone2: [''],
      Email: ['', [Validators.email]],
      Photo: [null], // Optional
      Category: [null], // Optional
      NationalityEn: [''],
      NationalityUz: [''],
      NationalityRu: [''],
      NationalityUzRu: [''],
      NationalityKaa: [''],
      Birthday: [null], // Optional
      BirthPlaceUz: [''],
      BirthPlaceEn: [''],
      BirthPlaceRu: [''],
      BirthPlaceUzRu: [''],
      BirthPlaceKaa: [''],
      PositionEn: [''],
      PositionUz: [''],
      PositionRu: [''],
      PositionUzRu: [''],
      PositionKaa: [''],
      WorkFromDate: [null], // Optional
      WorkPlaceUz: [''],
      WorkPlaceEn: [''],
      WorkPlaceRu: [''],
      WorkPlaceUzRu: [''],
      WorkPlaceKaa: [''],
      ReceptionTimeUz: [''],
      ReceptionTimeEn: [''],
      ReceptionTimeRu: [''],
      ReceptionTimeUzRu: [''],
      ReceptionTimeKaa: ['']
    });

    this.categories = config.data.employeeCategories;
    this.genders = config.data.genders;
  }

  // Submit the form and close the dialog
  onAdd() {
    if (this.employeeForm.valid) {
      const employeeData: EmployeeCreateRequest = this.employeeForm.value;
      this.ref.close(employeeData);
    }
  }

  // Close the dialog without saving
  onCancel() {
    this.ref.close();
  }

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.employeeForm.patchValue({ Photo: file });
    }
  }
}
