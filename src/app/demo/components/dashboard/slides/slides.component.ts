import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { CreateSlideRequest, DeleteSlideRequest, SlideResponse, UpdateSlideRequest } from 'src/app/layout/api/slide';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { SlideService } from 'src/app/layout/service/slide.service';
import { CreateSlideDialogComponent } from './create.slide.dialog/create.slide.dialog.component';
import { UpdateSlideDialogComponent } from './update.slide.dialog/update.slide.dialog.component';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrl: './slides.component.scss'
})
export class SlidesComponent implements OnInit {

  products: Product[] = [];

  sortOptions: SelectItem[] = [];

  sortOrder: number = 0;

  sortField: string = '';

  sourceCities: any[] = [];

  targetCities: any[] = [];

  orderCities: any[] = [];

  slides: SlideResponse[] = [];

  constructor(
    private productService: ProductService,
    private baseApiService: BaseApiService,
    private dialogService: DialogService,
    private slideService: SlideService
) { }

  ngOnInit() {
    this.loadSlides();
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

  loadSlides(){
    this.slideService.getAll().subscribe({
        next: (data: SlideResponse[]) => {
            this.slides = data;
        },
        error: (error) => console.error('Error:', error)
    });
  }

  create(){
    const ref = this.dialogService.open(CreateSlideDialogComponent, {
        header: 'Create New Slide',
        width: '70%',
        contentStyle: { 'overflow-y': 'auto' }
    });

    ref.onClose.subscribe({
        next: (data: CreateSlideRequest) => {
            this.slideService.create(data).subscribe({
                next: (slide: SlideResponse) => {
                    console.log('Slide created successfully', slide);
                    this.loadSlides();
                },
                error: (error) => console.error('Error:', error)
            });
        },
        error: (error) => console.error('Error:', error)
    });
  }

  update(slide: SlideResponse) {
    const ref = this.dialogService.open(UpdateSlideDialogComponent, {
        header: 'Update Slide',
        width: '70%',
        contentStyle: { 'overflow-y': 'auto' },
        data: {
            slide: slide
        }
    });

    ref.onClose.subscribe({
        next: (data: UpdateSlideRequest) => {
            this.slideService.update(data).subscribe({
                next: () => {
                    console.log('Slide updated successfully');
                    this.loadSlides();
                },
                error: (error) => console.error('Error:', error)
            });
        },
        error: (error) => console.error('Error:', error)
    });
  }

  delete(id: string){
    const deleteSlideRequest: DeleteSlideRequest = {
        id: id,
    }
    this.slideService.delete(deleteSlideRequest).subscribe({
        next: () => {
            console.log('Slide deleted successfully');
            this.loadSlides();
        },
        error: (error) => console.error('Error:', error)
    });
  }

  getPhoto(id: string) : string{
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

