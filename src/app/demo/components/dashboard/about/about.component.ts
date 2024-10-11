import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { ProductService } from 'src/app/demo/service/product.service';
import { CreateAboutCommand, GetAboutResponse, UpdateAboutCommand } from 'src/app/layout/api/about';
import { AboutService } from 'src/app/layout/service/about.service';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateAboutDialogComponent } from './create.about.dialog/create.about.dialog.component';
import { UpdateAboutDialogComponent } from './update.about.dialog/update.about.dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  aboutList: GetAboutResponse[] = []; // Complete list of About items.
  filteredAboutList: GetAboutResponse[] = []; // Filtered list for search.
  paginatedAboutList: GetAboutResponse[] = []; // The current page of filtered About items.

  rows: number = 3; // Number of rows per page.
  first: number = 0; // Current first index for pagination.

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';

  constructor(
    private productService: ProductService,
    private aboutService: AboutService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadAboutList();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  openCreateAboutDialog() {
    const ref = this.dialogService.open(CreateAboutDialogComponent, {
      header: this.translate.instant('CREATE_NEW'),
      width: '70%',
      contentStyle: { 'max-height': '70vh', 'overflow': 'auto' }
    });

    ref.onClose.subscribe((data: CreateAboutCommand | null) => {
      if (data) {
        this.aboutService.createAbout(data).subscribe({
          next: () => this.loadAboutList(),
          error: (error) => console.error('Error creating about:', error)
        });
      }
    });
  }

  openUpdateAboutDialog(id: string) {
    const ref = this.dialogService.open(UpdateAboutDialogComponent, {
      header: this.translate.instant('UPDATE'),
      width: '70%',
      contentStyle: { 'max-height': '70vh', 'overflow': 'auto' },
      data: { id: id }
    });

    ref.onClose.subscribe((data: UpdateAboutCommand | null) => {
      if (data) {
        this.aboutService.updateAbout(data).subscribe({
          next: () => this.loadAboutList(),
          error: (error) => console.error('Error updating about:', error)
        });
      }
    });
  }

  deleteAbout(id: string) {   
    this.aboutService.deleteAbout(id).subscribe({
      next: () => this.loadAboutList(),
      error: (error) => console.error('Error deleting about:', error)
    });
  }

  loadAboutList() {
    this.aboutService.getAllAbout().subscribe({
      next: (data: GetAboutResponse[]) => {
        this.aboutList = data;
        this.filteredAboutList = this.aboutList; // Initialize filtered list.
        this.updatePaginatedList(); // Update pagination when data is loaded.
      },
      error: (error: Error) => console.log(error)
    });
  }

  onFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    
    // Filter based on search criteria
    this.filteredAboutList = this.aboutList.filter(product =>
      product.receptionTimeEn?.toLowerCase().includes(input) ||
      product.descriptionEn?.toLowerCase().includes(input)
    );
    
    this.first = 0;
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
    this.paginatedAboutList = this.filteredAboutList.slice(start, end);
  }
}
