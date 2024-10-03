import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EnumResponse } from 'src/app/layout/api/enum';
import { UpdateUserRequest } from 'src/app/layout/api/user';

@Component({
  selector: 'app-update.user.dialog',
  templateUrl: './update.user.dialog.component.html',
  styleUrl: './update.user.dialog.component.scss'
})
export class UpdateUserDialogComponent implements OnInit {
  userForm: FormGroup;
  genders: EnumResponse[] = [];
  userRoles: EnumResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ){
    this.userForm = this.fb.group({
      id: [, Validators.required],
      firstnameEn: [''],
      firstnameRu: [''],
      lastnameEn: [''],
      lastnameRu: [''],
      gender: [''],
      userrole: [''],
      phone1: [''],
      phone2: [''],
      email: ['', [Validators.email]],
      oldPassword: [''],
      password: ['', [Validators.minLength(6)]],
      confirmPassword: [''],
      photo: [null]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit(){
    this.genders = this.config?.data?.genders ?? [];
    this.userRoles = this.config?.data?.userRoles ?? [];
    this.userForm.patchValue(this.config?.data?.user);
    this.userForm.get('userrole').setValue(this.config?.data?.user?.userrole.id);
    this.userForm.get('gender').setValue(this.config?.data?.user?.gender.id);
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onFileSelect(event: any): void {
    if (event.target.files[0]) {
      this.userForm.patchValue({ photo: event.target.files[0] });
    }
  }

  onCancel(): void {
    this.ref.close(null);
  }

  onSubmit(){
    if(this.userForm.valid){
      const updateUserRequest: UpdateUserRequest = this.userForm.value;
      this.ref.close(updateUserRequest);
    }
  }
}
