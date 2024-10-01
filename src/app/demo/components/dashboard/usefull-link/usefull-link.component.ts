import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { CreateUsefullLinkRequest, DeleteUsefullLinkRequest, UpdateUsefullLinkRequest, UsefullLinkResponse } from 'src/app/layout/api/usefullLink';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { UsefullLinkService } from 'src/app/layout/service/usefull-link.service';
import { CreateUsefullLinkDialogComponent } from './create.usefull-link.dialog/create.usefull-link.dialog.component';
import { UpdateUsefullLinkDialogComponent } from './update.usefull-link.dialog/update.usefull-link.dialog.component';

@Component({
  selector: 'app-usefull-link',
  templateUrl: './usefull-link.component.html',
  styleUrl: './usefull-link.component.scss'
})
export class UsefullLinkComponent implements OnInit {

  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  links: UsefullLinkResponse[] =  [];


  constructor(
    private productService: ProductService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
    private linkService: UsefullLinkService
) { }

  ngOnInit() {
    this.loadUsefullLink();
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

  loadUsefullLink(){
    this.linkService.getAll().subscribe({
        next: (data: UsefullLinkResponse[]) => {
            this.links = data;
            console.log(this.links);
        },
        error: (error) => console.error('Error:', error)
    });
  }

  create(){
    const ref = this.dialogService.open(CreateUsefullLinkDialogComponent, {
        header: 'Create New usefullLink',
        width: '80%',
        contentStyle: { 'overflow-y': 'auto' }
    });

    ref.onClose.subscribe({
        next: (data: CreateUsefullLinkRequest) => {
            this.linkService.create(data).subscribe({
                next: (data: UsefullLinkResponse) => {
                    this.loadUsefullLink();
                },
                error: (error) => console.error('Error:', error)
            });
        },
        error: (error) => console.error('Error:', error)
    });
  }

  update(data: UsefullLinkResponse){
    const ref = this.dialogService.open(UpdateUsefullLinkDialogComponent, {
        header: 'Update Slide',
        width: '80%',
        contentStyle: { 'overflow-y': 'auto' },
        data: {
            usefullLink: data
        }
    });

    ref.onClose.subscribe({
        next: (data: UpdateUsefullLinkRequest) => {
            this.linkService.update(data).subscribe({
                next: (data: UsefullLinkResponse) => {
                    this.loadUsefullLink();
                },
                error: (error) => console.error('Error:', error)
            });
        },
        error: (error) => console.error('Error:', error)
    });
  }

  delete(id: string){
    const deleteusefullLinkRequest: DeleteUsefullLinkRequest = {
        id: id
    }

    this.linkService.delete(deleteusefullLinkRequest).subscribe({
        next: () => {
            this.loadUsefullLink();
        },
        error: (error) => console.error('Error:', error)
    });
  }

  getPhoto(id: string){
    return this.baseApiService.getPhoto(id);
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

