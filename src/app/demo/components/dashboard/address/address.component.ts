import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateLocationRequest, DeleteLocationRequest, LocationResponse, UpdateLocationRequest } from 'src/app/layout/api/location';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { LocationService } from 'src/app/layout/service/location.service';
import { CreateAddressDialogComponent } from './create.address.dialog/create.address.dialog.component';
import { UpdateAddressDialogComponent } from './update.address.dialog/update.address.dialog.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  addresses: LocationResponse[] = []; // Complete list of addresses.
  filteredAddresses: LocationResponse[] = []; // Filtered list for search.
  paginatedAddresses: LocationResponse[] = []; // Current page of filtered addresses.

  rows: number = 3; // Number of rows per page.
  first: number = 0; // Current first index for pagination.

  sortOptions: SelectItem[] = [];
  sortOrder: number = 0;
  sortField: string = '';

  constructor(
    private locationService: LocationService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadAddresses();

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  openCreateAddressDialog() {
    const ref = this.dialogService.open(CreateAddressDialogComponent, {
      header: this.translate.instant('CREATE_NEW'),
      width: '80%',
      contentStyle: { 'max-height': '80vh', 'overflow': 'auto' }
    });

    ref.onClose.subscribe((data: CreateLocationRequest | null) => {
      if (data) {
        this.locationService.createLocation(data).subscribe({
          next: () => this.loadAddresses(),
          error: (error) => console.error('Error creating address:', error)
        });
      }
    });
  }

  openUpdateAddressDialog(address: LocationResponse) {
    const ref = this.dialogService.open(UpdateAddressDialogComponent, {
      header: this.translate.instant('UPDATE'),
      width: '80%',
      contentStyle: { 'max-height': '80vh', 'overflow': 'auto' },
      data: { address: address }
    });

    ref.onClose.subscribe((data: UpdateLocationRequest | null) => {
      if (data) {
        this.locationService.updateLocation(data).subscribe({
          next: () => this.loadAddresses(),
          error: (error) => console.error('Error updating address:', error)
        });
      }
    });
  }

  deleteAddress(id: string) {
    const deleteRequest: DeleteLocationRequest = { id: id };
    this.locationService.deleteLocation(deleteRequest).subscribe({
      next: () => this.loadAddresses(),
      error: (error) => console.error('Error deleting address:', error)
    });
  }

  loadAddresses() {
    this.locationService.getAllLocations().subscribe({
      next: (data: LocationResponse[]) => {
        this.addresses = data;
        this.filteredAddresses = this.addresses; // Initialize filtered list.
        this.updatePaginatedList(); // Update pagination when data is loaded.
      },
      error: (error) => console.error('Error loading addresses:', error)
    });
  }

  onFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    
    // Filter based on search criteria
    this.filteredAddresses = this.addresses.filter(address =>
      address.nameUz.toLowerCase().includes(input) ||
      address.nameEn.toLowerCase().includes(input) ||
      address.nameRu.toLowerCase().includes(input) ||
      address.nameUzRu.toLowerCase().includes(input) ||
      address.nameKaa.toLowerCase().includes(input)
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
    this.paginatedAddresses = this.filteredAddresses.slice(start, end);
  }

  getPhoto(id: string): string {
    return this.baseApiService.getPhoto(id);
  }
}
