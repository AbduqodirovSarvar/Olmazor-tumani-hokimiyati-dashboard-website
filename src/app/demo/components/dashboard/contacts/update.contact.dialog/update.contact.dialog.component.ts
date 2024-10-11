import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateContactCommand } from 'src/app/layout/api/contact';
import { EnumResponse } from 'src/app/layout/api/enum';

@Component({
  selector: 'app-update.contact.dialog',
  templateUrl: './update.contact.dialog.component.html',
  styleUrl: './update.contact.dialog.component.scss'
})
export class UpdateContactDialogComponent implements OnInit {
  contactForm: FormGroup;
  types: EnumResponse[] = [];

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
  ){
    this.contactForm = fb.group({
      id: ['', Validators.required],
      type: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.types = this.config.data.types;
    
    this.contactForm.patchValue(this.config.data.contact);
  }

  onUpdate(){
    if(this.contactForm.valid){
      const updateContactRequest: CreateContactCommand = this.contactForm.value;
      this.ref.close(updateContactRequest);
    }
  }

  onCancel(){
    this.ref.close(null);
  }
}
