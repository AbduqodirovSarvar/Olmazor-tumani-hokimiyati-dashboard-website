import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpdateUsefullLinkRequest } from 'src/app/layout/api/usefullLink';

@Component({
  selector: 'app-update.usefull-link.dialog',
  templateUrl: './update.usefull-link.dialog.component.html',
  styleUrl: './update.usefull-link.dialog.component.scss'
})
export class UpdateUsefullLinkDialogComponent implements OnInit {
  usefulLinkForm: FormGroup;
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private config: DynamicDialogConfig,
    private ref: DynamicDialogRef
  ) {
    this.usefulLinkForm = this.fb.group({
      id: ['', Validators.required],
      nameUz: [''],
      nameEn: [''],
      nameRu: [''],
      nameUzRu: [''],
      nameKaa: [''],
      link: ['', [Validators.pattern('https?://.+')]],
      photo: [null]
    });
  }

  ngOnInit(): void {
    if (this.config.data.usefullLink) {
      this.usefulLinkForm.patchValue(this.config.data.usefullLink);
    }
  }

  onFileSelect(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.usefulLinkForm.patchValue({ photo: file });
    }
  }

  onSubmit(): void {
    if (this.usefulLinkForm.valid) {
      const updateRequest: UpdateUsefullLinkRequest = {
        ...this.usefulLinkForm.value,
        photo: this.selectedFile || this.usefulLinkForm.get('photo')?.value
      };
      this.ref.close(updateRequest);
    }
  }

  onCancel(): void {
    this.ref.close(null);
  }
}