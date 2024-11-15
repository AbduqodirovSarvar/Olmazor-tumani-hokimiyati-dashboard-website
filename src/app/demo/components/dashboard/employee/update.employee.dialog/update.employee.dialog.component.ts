import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmployeeResponse, EmployeeUpdateRequest } from 'src/app/layout/api/employee';
import { EnumResponse } from 'src/app/layout/api/enum';
import { CalendarModule } from 'primeng/calendar';

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
    const formatDate = (date: Date) => date.toISOString().split('T')[0];
  
    this.employeeForm.patchValue({
      ...this.currentEmployee,
      birthday: formatDate(new Date(this.currentEmployee.birthday)),
      workFromDate: formatDate(new Date(this.currentEmployee.workFromDate))
    });
  
    this.categories = this.config.data.categories;
    this.genders = this.config.data.genders;
    this.employeeForm.get('gender').setValue(this.currentEmployee.gender.id);
    this.employeeForm.get('category').setValue(this.currentEmployee.category.id);
  }

  // Submit the updated form and close the dialog
  onUpdate() {
    if (this.employeeForm.valid) {
      const formatDate = (date: string) => new Date(date).toISOString().split('T')[0];
  
      const updatedEmployeeData: EmployeeUpdateRequest = {
        id: this.employeeId,
        gender: this.employeeForm.get('gender').value,
        category: this.employeeForm.get('category').value,
        Birthday: formatDate(this.employeeForm.get('birthday').value),
        WorkFromDate: formatDate(this.employeeForm.get('workFromDate').value),
        ...this.employeeForm.value,
      };
      this.ref.close(updatedEmployeeData);
    } else {
      alert("ERROR!");
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