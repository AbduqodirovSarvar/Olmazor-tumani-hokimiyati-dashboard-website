import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { LocationResponse } from 'src/app/layout/api/location';
import { DeleteSectorRequest, SectorResponse } from 'src/app/layout/api/sector';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { LocationService } from 'src/app/layout/service/location.service';
import { SectorService } from 'src/app/layout/service/sector.service';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrl: './sectors.component.scss'
})
export class SectorsComponent implements OnInit {

  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  sectors: SectorResponse[] = [];
  locations: LocationResponse[] = [];

  constructor(
    private productService: ProductService,
    private sectorService: SectorService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
    private locationService: LocationService
) { }

  ngOnInit() {
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

  loadSectors(){
    this.sectorService.getAll().subscribe({
        next: (data: SectorResponse[]) => {
            this.sectors = data;
        },
        error: (error) => console.error('Error:', error)
    });
  }

  loadLocations(){
    this.locationService.getAllLocations().subscribe({
        next: (data: LocationResponse[]) => {
            this.locations = data;
        },
        error: (error) => console.error('Error:', error)
    });
  }

  create(){

  }

  update(sector: SectorResponse){
    
  }

  delete(id: string) {
    const deleteSectorRequest: DeleteSectorRequest = {
        id: id
    }
    this.sectorService.delete(deleteSectorRequest).subscribe({
        next: (data: boolean) => {
            if(data){
                console.log('Sector deleted successfully', data);
                this.loadSectors();
            }
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

