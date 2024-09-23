import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { EnumResponse } from 'src/app/layout/api/enum';
import { PostResponse } from 'src/app/layout/api/post';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { PostService } from 'src/app/layout/service/post.service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'] // Fixed typo from styleUrl to styleUrls
})
export class PostsComponent implements OnInit {
  products: Product[] = [];
  posts: PostResponse[] = [];
  filteredPosts: PostResponse[] = [];
  paginatedPosts: PostResponse[] = [];
  postcategories: EnumResponse[] = [];
  currentCategory: EnumResponse;
  dropdownPlaceholder: string = 'Select Category';
  dropdownOptionLabel: string = 'nameEn';
  sortOptions: SelectItem[] = [];
  rows: number = 3; // Number of rows per page.
  first: number = 0;
  searchValue: string = ''; // Search input value

  constructor(
    private productService: ProductService,
    private postService: PostService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadPosts();

    this.productService.getProducts().then(data => this.products = data);

    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  paginate(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedList();
  }

  updatePaginatedList() {
    this.filteredPosts = this.posts.slice(this.first, this.first + this.rows);
  }

  loadCategories() {
    this.baseApiService.getPostCategories().subscribe({
      next: (data: any) => {
        this.postcategories = data;
        this.currentCategory = this.postcategories[0];
        this.dropdownPlaceholder = this.currentCategory.nameEn;
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  loadPosts() {
    this.postService.getAllPosts().subscribe({
      next: (data: PostResponse[]) => {
        this.posts = data.filter(post => post.category == this.currentCategory.id);
        this.filteredPosts = [...this.posts];
        this.updatePaginatedList();
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  openCreatePostDialog() {
    alert("Please enter create");
  }

  openUpdatePostDialog() {
    alert("Please enter update");
  }

  onSortChange(event: any) {
    const value = event.value;
    this.currentCategory = value;
    this.loadPosts();
  }

  onFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.nameEn.toLowerCase().includes(value) || 
      post.descriptionEn.toLowerCase().includes(value)
    );
    this.first = 0; // Reset pagination
    this.updatePaginatedList();
  }
}
