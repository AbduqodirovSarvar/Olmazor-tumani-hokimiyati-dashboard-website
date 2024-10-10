import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { PostResponse, CreatePostRequest, UpdatePostRequest } from 'src/app/layout/api/post';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { PostService } from 'src/app/layout/service/post.service';
import { EnumResponse } from 'src/app/layout/api/enum';
import { CreatePostDialogComponent } from './create.post.dialog/create.post.dialog.component';
import { UpdatePostDialogComponent } from './update.post.dialog/update.post.dialog.component';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: PostResponse[] = []; // All posts fetched from the server
  filteredPosts: PostResponse[] = []; // Posts after filtering
  paginatedPosts: PostResponse[] = []; // Posts displayed on current page
  postCategories: EnumResponse[] = []; // Available categories
  currentCategory: EnumResponse; // Current selected category
  dropdownPlaceholder: string = 'Select Category';
  dropdownOptionLabel: string = 'nameEn';
  rows: number = 3; // Number of rows per page
  first: number = 0; // First record in current page
  searchValue: string = ''; // Search input value

  constructor(
    private postService: PostService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService
  ) {}

  ngOnInit() {
    this.loadCategories();
    this.loadPosts();
  }

  // Pagination method
  paginate(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.updatePaginatedList();
  }

  // Update the paginatedPosts array based on current page and filtering
  updatePaginatedList() {
    const start = this.first;
    const end = this.first + this.rows;
    this.paginatedPosts = this.filteredPosts.slice(start, end);
  }

  // Load post categories
  loadCategories() {
    this.baseApiService.getPostCategories().subscribe({
      next: (data: EnumResponse[]) => {
        this.postCategories = data;
        this.currentCategory = this.postCategories[0]; // Default to first category
        this.dropdownPlaceholder = this.currentCategory.nameEn;
        this.loadPosts(); // Load posts once categories are available
      },
      error: (error) => console.error('Error loading categories:', error)
    });
  }

  // Load posts based on the current category
  loadPosts() {
    this.postService.getAllPosts(this.currentCategory.id.toString()).subscribe({
      next: (data: PostResponse[]) => {
        this.posts = data;
        this.filteredPosts = [...this.posts];
        this.updatePaginatedList(); // Update list with the new data
      },
      error: (error) => console.error('Error loading posts:', error)
    });
  }

  // Handle category change from dropdown
  onCategoryChange(event: any) {
    const selectedCategoryId = event.value;
    this.currentCategory = this.postCategories.find(c => c.id === selectedCategoryId);
    this.loadPosts(); // Reload posts when category changes
  }

  // Handle search input and filter posts
  onFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.toLowerCase();
    this.filteredPosts = this.posts.filter(post =>
      post.nameEn.toLowerCase().includes(value) || 
      post.descriptionEn.toLowerCase().includes(value)
    );
    this.first = 0; // Reset pagination when search changes
    this.updatePaginatedList();
  }

  // Create new post
  openCreatePostDialog() {
    const ref = this.dialogService.open(CreatePostDialogComponent, {
      header: 'Create New Post',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' }
    });

    ref.onClose.subscribe((data: CreatePostRequest) => {
      if (data) {
        data.Category = this.currentCategory.id; // Assign the selected category to the new post
        this.postService.createPost(data).subscribe({
          next: () => this.loadPosts(),
          error: (error) => console.error('Error creating post:', error)
        });
      }
    });
  }

  // Update post
  openUpdatePostDialog(post: PostResponse) {
    const ref = this.dialogService.open(UpdatePostDialogComponent, {
      header: 'Update Post',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
      data: { post: post }
    });

    ref.onClose.subscribe((data: UpdatePostRequest) => {
      if (data) {
        this.postService.updatePost(data).subscribe({
          next: () => this.loadPosts(),
          error: (error) => console.error('Error updating post:', error)
        });
      }
    });
  }

  // Delete post
  deletePost(id: string) {
    this.postService.deletePost(id).subscribe({
      next: () => this.loadPosts(),
      error: (error) => console.error('Error deleting post:', error)
    });
  }

  // Get post photo URL
  getPhoto(id: string): string {
    return this.baseApiService.getPhoto(id);
  }
}
