import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { config } from 'chai';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EnumResponse } from 'src/app/layout/api/enum';
import { CreateUserRequest } from 'src/app/layout/api/user';

@Component({
  selector: 'app-create.user.dialog',
  templateUrl: './create.user.dialog.component.html',
  styleUrl: './create.user.dialog.component.scss'
})
export class CreateUserDialogComponent implements OnInit {
  userForm: FormGroup;
  genders: EnumResponse[] = []; // Gender dropdown options
  userRoles: EnumResponse[] = []; // User role dropdown options

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ){
    this.userForm = this.fb.group({
      firstnameEn: ['', Validators.required],
      firstnameRu: ['', Validators.required],
      lastnameEn: ['', Validators.required],
      lastnameRu: ['', Validators.required],
      gender: ['', Validators.required],
      userrole: ['', Validators.required],
      phone1: [''],
      phone2: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photo: [null]
    });
  }

  ngOnInit(): void {
    this.genders = this.config?.data?.genders ?? [];
    this.userRoles = this.config?.data?.userRoles ?? [];
  }

  onFileSelect(event: any): void {
    if (event.target.files[0]) {
      this.userForm.patchValue({ photo: event.target.files[0] });
    }
  }

  onCancel(){
    this.ref.close(null);
  }

  onSubmit(){
    if(this.userForm.valid){
      console.log(this.userForm);
      const createUserRequest: CreateUserRequest = this.userForm.value;
      // createUserRequest.gender 
      this.ref.close(createUserRequest);
    }
    else{
      console.error('Form is invalid');
    }
  }
}
