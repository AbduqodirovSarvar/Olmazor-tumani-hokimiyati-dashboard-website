import { Component, OnInit } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateSectorRequest, DeleteSectorRequest, SectorResponse, UpdateSectorRequest } from 'src/app/layout/api/sector';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { SectorService } from 'src/app/layout/service/sector.service';
import { CreateSectorDialogComponent } from './create.sector.dialog/create.sector.dialog.component';
import { UpdateSectorDialogComponent } from './update.sector.dialog/update.sector.dialog.component';
import { LocationService } from 'src/app/layout/service/location.service';
import { EmployeeService } from 'src/app/layout/service/employee.service';
import { EmployeeResponse } from 'src/app/layout/api/employee';
import { LocationResponse } from 'src/app/layout/api/location';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sectors',
  templateUrl: './sectors.component.html',
  styleUrls: ['./sectors.component.scss']
})
export class SectorsComponent implements OnInit {

  sectors: SectorResponse[] = []; // Complete list of sectors.
  filteredSectors: SectorResponse[] = []; // Filtered list for search.
  paginatedSectors: SectorResponse[] = []; // Current page of filtered sectors.

  rows: number = 3; // Number of rows per page.
  first: number = 0; // Current first index for pagination.
  employees: EmployeeResponse[] = [];
  locations: LocationResponse[] = [];

  constructor(
    private sectorService: SectorService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
    private locationService: LocationService,
    private employeeService: EmployeeService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.loadSectors();
    this.loadLocations();
    this.loadEmployees();
  }

  openCreateSectorDialog() {
    const ref = this.dialogService.open(CreateSectorDialogComponent, {
      header: this.translate.instant('CREATE_NEW'),
      width: '70%',
      contentStyle: { 'max-height': '70vh', 'overflow': 'auto' },
      data: {
        locations: this.locations,
        employees: this.employees
      }
    });

    ref.onClose.subscribe((data: CreateSectorRequest | null) => {
      if (data) {
        this.sectorService.create(data).subscribe({
          next: () => this.loadSectors(),
          error: (error) => console.error('Error creating sector:', error)
        });
      }
    });
  }

  openUpdateSectorDialog(sector: SectorResponse) {
    const ref = this.dialogService.open(UpdateSectorDialogComponent, {
      header: this.translate.instant('UPDATE'),
      width: '70%',
      contentStyle: { 'max-height': '70vh', 'overflow': 'auto' },
      data: {
        sector: sector,
        locations: this.locations,
        employees: this.employees
      }
    });

    ref.onClose.subscribe((data: UpdateSectorRequest | null) => {
      if (data) {
        this.sectorService.update(data).subscribe({
          next: () => this.loadSectors(),
          error: (error) => console.error('Error updating sector:', error)
        });
      }
    });
  }

  deleteSector(id: string) {
    const deleteSectorRequest: DeleteSectorRequest = { id: id };
    this.sectorService.delete(deleteSectorRequest).subscribe({
      next: () => this.loadSectors(),
      error: (error) => console.error('Error deleting sector:', error)
    });
  }

  loadSectors() {
    this.sectorService.getAll().subscribe({
      next: (data: SectorResponse[]) => {
        this.sectors = data;
        this.filteredSectors = this.sectors; // Initialize filtered list.
        this.updatePaginatedList(); // Update pagination when data is loaded.
      },
      error: (error) => console.error('Error loading sectors:', error)
    });
  }

  loadLocations(){
    this.locationService.getAllLocations().subscribe({
      next: (data: LocationResponse[]) => {
        this.locations = data;
      },
      error: (error) => console.error('Error loading locations:', error)
    });
  }

  loadEmployees(){
    this.employeeService.getAll(null).subscribe({
      next: (data: EmployeeResponse[]) => {
        this.employees = data;
      },
      error: (error) => console.error('Error loading employees:', error)
    });
  }

  onFilter(event: Event) {
    const input = (event.target as HTMLInputElement).value.toLowerCase();
    
    // Filter based on search criteria
    this.filteredSectors = this.sectors.filter(sector =>
      sector.nameEn.toLowerCase().includes(input) || 
      sector.nameUz.toLowerCase().includes(input)
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
    this.paginatedSectors = this.filteredSectors.slice(start, end);
  }

  getPhoto(id: string): string {
    return this.baseApiService.getPhoto(id);
  }
}
