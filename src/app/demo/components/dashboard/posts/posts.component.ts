import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { EnumResponse } from 'src/app/layout/api/enum';
import { CreatePostRequest, PostResponse, UpdatePostRequest } from 'src/app/layout/api/post';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { PostService } from 'src/app/layout/service/post.service';
import { filter } from 'rxjs';
import { CreatePostDialogComponent } from './create.post.dialog/create.post.dialog.component';
import { UpdatePostDialogComponent } from './update.post.dialog/update.post.dialog.component';
import { dA } from '@fullcalendar/core/internal-common';

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
  rows: number = 6; // Number of rows per page.
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
        console.log(data);
        this.posts=[];
        this.posts = data.filter(post => post.category == this.currentCategory.id);
        console.log(this.posts);
        this.filteredPosts = [...this.posts];
        this.updatePaginatedList();
      },
      error: (error: Error) => {
        console.log(error);
      }
    });
  }

  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: () => {
        console.log('Post deleted successfully:', id);
        this.loadPosts();
      },
      error: (error: Error) => {
        console.error('Error deleting post:', error);
      }
    });
  }

  openCreatePostDialog() {
    const ref = this.dialogService.open(CreatePostDialogComponent, {
      header: 'Create New Post',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
  
    ref.onClose.subscribe({
      next: (data: CreatePostRequest) => {
        data.Category = this.currentCategory.id;
        this.postService.createPost(data).subscribe({
          next: (response: PostResponse) => {
            console.log('Post created successfully:', response);
            this.loadPosts();
          },
          error: (error) => {
            console.error('Error creating post:', error);
          }
        });
      }
    })
  }

  openUpdatePostDialog(post: PostResponse) {
    const ref = this.dialogService.open(UpdatePostDialogComponent, {
      header: 'Update The Post',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      data: { post: post }
    });
    
    ref.onClose.subscribe({
      next: (data: UpdatePostRequest) => {
        this.postService.updatePost(data).subscribe({
          next: (response: PostResponse) => {
            console.log('Post updated successfully:', response);
            this.loadPosts();
          },
          error: (error) => {
            console.error('Error updating post:', error); 
          }
        });
      }
    })
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
