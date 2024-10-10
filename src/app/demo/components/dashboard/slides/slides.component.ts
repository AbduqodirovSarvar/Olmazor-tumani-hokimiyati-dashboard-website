import { Component, OnInit } from '@angular/core';
import { DataView } from 'primeng/dataview';
import { DialogService } from 'primeng/dynamicdialog';
import { SlideResponse, CreateSlideRequest, UpdateSlideRequest, DeleteSlideRequest } from 'src/app/layout/api/slide';
import { SlideService } from 'src/app/layout/service/slide.service';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { CreateSlideDialogComponent } from './create.slide.dialog/create.slide.dialog.component';
import { UpdateSlideDialogComponent } from './update.slide.dialog/update.slide.dialog.component';

@Component({
	selector: 'app-slides',
	templateUrl: './slides.component.html',
	styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

	slides: SlideResponse[] = [];
	filteredSlides: SlideResponse[] = [];
	paginatedSlides: SlideResponse[] = [];

	rows: number = 3;
	first: number = 0;

	sortOrder: number = 0;
	sortField: string = '';

	constructor(
		private slideService: SlideService,
		private dialogService: DialogService,
		private baseApiService: BaseApiService
	) { }

	ngOnInit() {
		this.loadSlides();
	}

	loadSlides() {
		this.slideService.getAll().subscribe({
			next: (data: SlideResponse[]) => {
				this.slides = data;
				this.filteredSlides = this.slides; // Initialize filtered slides
				this.updatePaginatedSlides();
			},
			error: (error) => console.error('Error:', error)
		});
	}

	create() {
		const ref = this.dialogService.open(CreateSlideDialogComponent, {
			header: 'Create New Slide',
			width: '70%',
			contentStyle: { 'overflow-y': 'auto' }
		});

		ref.onClose.subscribe({
			next: (data: CreateSlideRequest) => {
				if (data) {
					this.slideService.create(data).subscribe({
						next: (slide: SlideResponse) => {
							console.log('Slide created successfully', slide);
							this.loadSlides();
						},
						error: (error) => console.error('Error:', error)
					});
				}
			},
			error: (error) => console.error('Error:', error)
		});
	}

	update(slide: SlideResponse) {
		const ref = this.dialogService.open(UpdateSlideDialogComponent, {
			header: 'Update Slide',
			width: '70%',
			contentStyle: { 'overflow-y': 'auto' },
			data: { slide }
		});

		ref.onClose.subscribe({
			next: (data: UpdateSlideRequest) => {
				if (data) {
					this.slideService.update(data).subscribe({
						next: () => {
							console.log('Slide updated successfully');
							this.loadSlides();
						},
						error: (error) => console.error('Error:', error)
					});
				}
			},
			error: (error) => console.error('Error:', error)
		});
	}

	delete(id: string) {
		const deleteSlideRequest: DeleteSlideRequest = { id };
		this.slideService.delete(deleteSlideRequest).subscribe({
			next: () => {
				console.log('Slide deleted successfully');
				this.loadSlides();
			},
			error: (error) => console.error('Error:', error)
		});
	}

	getPhoto(id: string): string {
		return this.baseApiService.getPhoto(id);
	}

	// Filter the list based on search input
	onFilter(event: Event) {
		const searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
		this.filteredSlides = this.slides.filter(slide =>
			slide.nameEn?.toLowerCase().includes(searchTerm) ||
			slide.descriptionEn?.toLowerCase().includes(searchTerm)
		);
		this.first = 0; // Reset pagination on search
		this.updatePaginatedSlides();
	}

	// Handle pagination
	paginate(event: any) {
		this.first = event.first;
		this.rows = event.rows;
		this.updatePaginatedSlides();
	}

	// Update paginated slides based on the current page
	updatePaginatedSlides() {
		const start = this.first;
		const end = this.first + this.rows;
		this.paginatedSlides = this.filteredSlides.slice(start, end);
	}
}
