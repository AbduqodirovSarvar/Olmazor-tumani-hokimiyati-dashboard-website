import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ProductService } from 'src/app/demo/service/product.service';
import { CreateAboutCommand, CreateAboutResponse, GetAboutResponse, UpdateAboutCommand, UpdateAboutResponse } from 'src/app/layout/api/about';
import { AboutService } from 'src/app/layout/service/about.service';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateAboutDialogComponent } from './create.about.dialog/create.about.dialog.component';
import { UpdateAboutDialogComponent } from './update.about.dialog/update.about.dialog.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'] // Correct typo from "styleUrl" to "styleUrls"
})
export class AboutComponent implements OnInit {

  aboutList: GetAboutResponse[] = []; // The complete list of About items.
  filteredAboutList: GetAboutResponse[] = []; // The filtered list based on search.
  paginatedAboutList: GetAboutResponse[] = []; // The current page of filtered About items.
  
  products: any[] = []; // Dummy for DataView binding.
  
  rows: number = 6; // Number of rows per page.
  first: number = 0; // The first index for pagination.
  
  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';
  
  constructor(
    private productService: ProductService,
    private aboutService: AboutService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    // Load products (if needed)
    this.productService.getProducts().then(data => this.products = data);
    
    // Load About list
    this.loadAboutList();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  openCreateAboutDialog() {
    const ref = this.dialogService.open(CreateAboutDialogComponent, {
      header: 'Create About',
      width: '70%',
      contentStyle: { 'max-height': '70hv', 'overflow': 'auto' }
    });

    ref.onClose.subscribe((data: CreateAboutCommand | null) => {
      if (data) {
        console.log(data);
        this.aboutService.createAbout(data).subscribe({
          next: (response: CreateAboutResponse) => {
            console.log('About created successfully');
            this.loadAboutList();
          },
          error: (error) => {
            console.error('Error creating about:', error);
          }
        });
      }
    });
  }

  openUpdateAboutDialog(id: string) {
    const ref = this.dialogService.open(UpdateAboutDialogComponent, {
      header: 'Update About',
      width: '70%',
      contentStyle: { 'max-height': '70hv', 'overflow': 'auto' },
      data: { id: id }
    });

    ref.onClose.subscribe((data: UpdateAboutCommand | null) => {
      if (data) {
        this.aboutService.updateAbout(data).subscribe({
          next: (response: UpdateAboutResponse) => {
            console.log('About created successfully');
          },
          error: (error) => {
            console.error('Error creating about:', error);
          }
        });
      }
    });
  }

  deleteAbout(id: string) {   
    this.aboutService.deleteAbout(id).subscribe({
      next: () => {
        console.log('About deleted successfully');
        this.loadAboutList();
      },
      error: (error) => {
        console.error('Error deleting about:', error);
      }
    });
  }

  loadAboutList() {
    this.aboutService.getAllAbout().subscribe({
      next: (data: GetAboutResponse[]) => {
        this.aboutList = data;
        this.filteredAboutList = [...this.aboutList]; // Clone array to avoid mutation
        this.updatePaginatedList();
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  onSortChange(event: any) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }

    this.sortList();
  }

  sortList() {
    if (this.sortField) {
      this.filteredAboutList.sort((a, b) => {
        let result = 0;

        if (a[this.sortField] > b[this.sortField]) {
          result = 1;
        } else if (a[this.sortField] < b[this.sortField]) {
          result = -1;
        }

        return this.sortOrder * result;
      });

      this.updatePaginatedList();
    }
  }

  paginate(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedList();
  }

  updatePaginatedList() {
    this.paginatedAboutList = this.filteredAboutList.slice(this.first, this.first + this.rows);
  }

  onFilter(dataView: any, event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();

    // Filter the aboutList based on the search input
    this.filteredAboutList = this.aboutList.filter(product =>
      product.receptionTimeEn.toLowerCase().includes(input) ||
      product.descriptionEn.toLowerCase().includes(input)
    );

    // Reset pagination and update the displayed list
    this.first = 0;
    this.updatePaginatedList();
  }
}
