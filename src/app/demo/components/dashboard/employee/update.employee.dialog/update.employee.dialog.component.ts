import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeResponse, EmployeeUpdateRequest } from 'src/app/layout/api/employee';
import { EnumResponse } from 'src/app/layout/api/enum';

@Component({
  selector: 'app-update.employee.dialog',
  templateUrl: './update.employee.dialog.component.html',
  styleUrl: './update.employee.dialog.component.scss'
})
export class UpdateEmployeeDialogComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId: string;
  currentEmployee: EmployeeResponse;
  categories: EnumResponse[] = [];
  genders: EnumResponse[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {
    this.currentEmployee = this.config.data.employee;

    this.employeeForm = this.fb.group({
      id: ['', Validators.required], // Employee ID is required for updates
      firstnameEn: [''],
      firstnameRu: [''],
      lastnameEn: [''],
      lastnameRu: [''],
      gender: [null],
      phone1: [''],
      phone2: [''],
      email: ['', [Validators.email]],
      photo: [null],
      category: [null],
      nationalityEn: [''],
      nationalityUz: [''],
      nationalityRu: [''],
      nationalityUzRu: [''],
      nationalityKaa: [''],
      birthday: [null],
      birthPlaceUz: [''],
      birthPlaceEn: [''],
      birthPlaceRu: [''],
      birthPlaceUzRu: [''],
      birthPlaceKaa: [''],
      positionEn: [''],
      positionUz: [''],
      positionRu: [''],
      positionUzRu: [''],
      positionKaa: [''],
      workFromDate: [null],
      workPlaceUz: [''],
      workPlaceEn: [''],
      workPlaceRu: [''],
      workPlaceUzRu: [''],
      workPlaceKaa: [''],
      receptionTimeUz: [''],
      receptionTimeEn: [''],
      receptionTimeRu: [''],
      receptionTimeUzRu: [''],
      receptionTimeKaa: ['']
    });

    this.employeeId = this.currentEmployee.id;
  }

  ngOnInit(): void {
    this.employeeForm.patchValue(this.currentEmployee);
    this.categories = this.config.data.categories;
    this.genders = this.config.data.genders;
    this.employeeForm.get('gender').setValue(this.currentEmployee.gender.id);
    this.employeeForm.get('category').setValue(this.currentEmployee.category.id);
  }

  // Submit the updated form and close the dialog
  onUpdate() {
    if (this.employeeForm.valid) {
      const updatedEmployeeData: EmployeeUpdateRequest = {
        id: this.employeeId,
        gender: this.currentEmployee.gender.id,
        category: this.currentEmployee.category.id,
        ...this.employeeForm.value,
      };
      this.ref.close(updatedEmployeeData);
    }
  }

  // Close the dialog without saving
  onCancel() {
    this.ref.close();
  }

  onFileSelect(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.employeeForm.patchValue({ photo: file });
    }
  }
}