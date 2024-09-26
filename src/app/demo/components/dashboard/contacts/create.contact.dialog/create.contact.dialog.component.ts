import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateContactCommand } from 'src/app/layout/api/contact';
import { EnumResponse } from 'src/app/layout/api/enum';

@Component({
  selector: 'app-create.contact.dialog',
  templateUrl: './create.contact.dialog.component.html',
  styleUrl: './create.contact.dialog.component.scss'
})
export class CreateContactDialogComponent implements OnInit {
  contactForm: FormGroup;
  types: EnumResponse[] = [];

  constructor(
    public ref: DynamicDialogRef,
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
  ){
    this.contactForm = fb.group({
      type: ['', Validators.required],
      value: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.types = this.config.data.types;
    this.contactForm.patchValue(this.config.data.contact);
  }

  onAdd(){
    if(this.contactForm.valid){
      const createContactRequest: CreateContactCommand = this.contactForm.value;
      this.ref.close(createContactRequest);
    }
  }

  onCancel() {
    this.ref.close(null);
  }
}
