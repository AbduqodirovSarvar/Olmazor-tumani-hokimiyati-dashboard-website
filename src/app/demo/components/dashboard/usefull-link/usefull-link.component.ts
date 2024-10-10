import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateUsefullLinkRequest, DeleteUsefullLinkRequest, UpdateUsefullLinkRequest, UsefullLinkResponse } from 'src/app/layout/api/usefullLink';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { UsefullLinkService } from 'src/app/layout/service/usefull-link.service';
import { CreateUsefullLinkDialogComponent } from './create.usefull-link.dialog/create.usefull-link.dialog.component';
import { UpdateUsefullLinkDialogComponent } from './update.usefull-link.dialog/update.usefull-link.dialog.component';

@Component({
  selector: 'app-usefull-link',
  templateUrl: './usefull-link.component.html',
  styleUrls: ['./usefull-link.component.scss']
})
export class UsefullLinkComponent implements OnInit {

  links: UsefullLinkResponse[] = []; // Complete list of useful links
  filteredLinks: UsefullLinkResponse[] = []; // Filtered list for search
  paginatedLinks: UsefullLinkResponse[] = []; // Current page of filtered links

  rows: number = 3; // Number of rows per page
  first: number = 0; // Current first index for pagination

  sortOrder: number = 0;
  sortField: string = '';

  constructor(
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
    private linkService: UsefullLinkService
  ) { }

  ngOnInit() {
    this.loadUsefullLinks();
  }

  loadUsefullLinks() {
    this.linkService.getAll().subscribe({
      next: (data: UsefullLinkResponse[]) => {
        this.links = data;
        this.filteredLinks = this.links; // Initialize filtered list
        this.updatePaginatedList(); // Update pagination when data is loaded
      },
      error: (error) => console.error('Error:', error)
    });
  }

  create() {
    const ref = this.dialogService.open(CreateUsefullLinkDialogComponent, {
      header: 'Create New Useful Link',
      width: '80%',
      contentStyle: { 'overflow-y': 'auto' }
    });

    ref.onClose.subscribe({
      next: (data: CreateUsefullLinkRequest) => {
        this.linkService.create(data).subscribe({
          next: () => this.loadUsefullLinks(),
          error: (error) => console.error('Error:', error)
        });
      },
      error: (error) => console.error('Error:', error)
    });
  }

  update(link: UsefullLinkResponse) {
    const ref = this.dialogService.open(UpdateUsefullLinkDialogComponent, {
      header: 'Update Useful Link',
      width: '80%',
      contentStyle: { 'overflow-y': 'auto' },
      data: { usefullLink: link }
    });

    ref.onClose.subscribe({
      next: (data: UpdateUsefullLinkRequest) => {
        this.linkService.update(data).subscribe({
          next: () => this.loadUsefullLinks(),
          error: (error) => console.error('Error:', error)
        });
      },
      error: (error) => console.error('Error:', error)
    });
  }

  delete(id: string) {
    const deleteRequest: DeleteUsefullLinkRequest = { id: id };

    this.linkService.delete(deleteRequest).subscribe({
      next: () => this.loadUsefullLinks(),
      error: (error) => console.error('Error:', error)
    });
  }

  getPhoto(id: string) {
    return this.baseApiService.getPhoto(id);
  }

  onFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();

    // Filter based on search criteria
    this.filteredLinks = this.links.filter(link =>
      link.nameUz.toLowerCase().includes(input) ||
      link.nameEn.toLowerCase().includes(input) ||
      link.nameRu.toLowerCase().includes(input) ||
      link.nameUzRu.toLowerCase().includes(input) ||
      link.nameKaa?.toLowerCase().includes(input)
    );

    this.first = 0; // Reset pagination
    this.updatePaginatedList();
  }

  paginate(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedList();
  }

  updatePaginatedList() {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedLinks = this.filteredLinks.slice(start, end);
  }
}
