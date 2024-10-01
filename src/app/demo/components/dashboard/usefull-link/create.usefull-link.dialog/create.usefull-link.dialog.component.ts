import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateUsefullLinkRequest } from 'src/app/layout/api/usefullLink';

@Component({
  selector: 'app-create.usefull-link.dialog',
  templateUrl: './create.usefull-link.dialog.component.html',
  styleUrl: './create.usefull-link.dialog.component.scss'
})
export class CreateUsefullLinkDialogComponent {
  usefulLinkForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.usefulLinkForm = this.fb.group({
      nameUz: ['', Validators.required],
      nameEn: ['', Validators.required],
      nameRu: ['', Validators.required],
      nameUzRu: ['', Validators.required],
      nameKaa: [''], // Optional field
      link: ['', [Validators.required, Validators.pattern('https?://.+')]],
      photo: [null, Validators.required] // Placeholder for file input
    });
  }

  onFileSelect(event: any): void {
    if (event.target.files[0]) {
      this.usefulLinkForm.patchValue({ photo: event.target.files[0] });
    }
  }

  onCancel(): void {
    this.ref.close(null);
  }

  onSubmit(): void {
    if (this.usefulLinkForm.valid) {
      const createUsefullLinkRequest: CreateUsefullLinkRequest = this.usefulLinkForm.value;
      this.ref.close(createUsefullLinkRequest);
    }
  }
}