import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { CreateLocationRequest, DeleteLocationRequest, LocationResponse, UpdateLocationRequest } from 'src/app/layout/api/location';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { LocationService } from 'src/app/layout/service/location.service';
import { UpdateAddressDialogComponent } from './update.address.dialog/update.address.dialog.component';
import { CreateAddressDialogComponent } from './create.address.dialog/create.address.dialog.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrl: './address.component.scss'
})
export class AddressComponent  implements OnInit {

  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];
  
  addresses: LocationResponse[] = [];

  constructor(
    private productService: ProductService,
    private locationService: LocationService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService
) { }

  ngOnInit() {

    this.loadAddresses();
      this.productService.getProducts().then(data => this.products = data);

      this.sourceCities = [
          { name: 'San Francisco', code: 'SF' },
          { name: 'London', code: 'LDN' },
          { name: 'Paris', code: 'PRS' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Berlin', code: 'BRL' },
          { name: 'Barcelona', code: 'BRC' },
          { name: 'Rome', code: 'RM' }];

      this.targetCities = [];

      this.orderCities = [
          { name: 'San Francisco', code: 'SF' },
          { name: 'London', code: 'LDN' },
          { name: 'Paris', code: 'PRS' },
          { name: 'Istanbul', code: 'IST' },
          { name: 'Berlin', code: 'BRL' },
          { name: 'Barcelona', code: 'BRC' },
          { name: 'Rome', code: 'RM' }];

      this.sortOptions = [
          { label: 'Price High to Low', value: '!price' },
          { label: 'Price Low to High', value: 'price' }
      ];
  }

  loadAddresses(){
    this.locationService.getAllLocations().subscribe({
        next: (data: LocationResponse[]) =>{
            this.addresses = data;
        },
        error: (error) => console.error('Error:', error)
    });
  }

  getPhoto(id: string) : string{
    return this.baseApiService.getPhoto(id);
  }

  create(){
    const ref = this.dialogService.open(CreateAddressDialogComponent, {
      header: 'Create New Address',
      width: '70%',
      contentStyle: { 'max-height': '70hv', 'overflow': 'auto' }
    });

    ref.onClose.subscribe({
        next: (data: CreateLocationRequest) => {
            this.locationService.createLocation(data).subscribe({
                next: (location: LocationResponse) => {
                    console.log('Location created successfully', location);
                    this.loadAddresses();
                },
                error: (error) => console.error('Error:', error)
            });
        },
        error: (error) => console.error('Error:', error)
    })
  }

  update(data: LocationResponse){
    const ref = this.dialogService.open(UpdateAddressDialogComponent,{
        header: 'Update Address',
        width: '70%',
        contentStyle: { 'max-height': '70hv', 'overflow': 'auto' },
        data: { address: data }
    });

    ref.onClose.subscribe({
        next: (data: UpdateLocationRequest) => {
            this.locationService.updateLocation(data).subscribe({
                next: (location: LocationResponse) => {
                    console.log('Location updated successfully', location);
                    this.loadAddresses();
                },
                error: (error) => console.error('Error:', error)
            });
        },
        error: (error) => console.error('Error:', error)
    })
  }

  delete(id: string) {
    const deleteLocaitionRequest: DeleteLocationRequest = {
        id: id
    };
    this.locationService.deleteLocation(deleteLocaitionRequest).subscribe({
        next: (data: boolean) => {
            console.log('Location deleted successfully', data);
            this.loadAddresses();
        },
        error: (error) => console.error('Error:', error)
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
  }

  onFilter(dv: DataView, event: Event) {
      dv.filter((event.target as HTMLInputElement).value);
  }
  
}

