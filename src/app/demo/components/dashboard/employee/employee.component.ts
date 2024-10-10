import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EmployeeCreateRequest, EmployeeDeleteRequest, EmployeeResponse, EmployeeUpdateRequest } from 'src/app/layout/api/employee';
import { EmployeeService } from 'src/app/layout/service/employee.service';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateEmployeeDialogComponent } from './create.employee.dialog/create.employee.dialog.component';
import { UpdateEmployeeDialogComponent } from './update.employee.dialog/update.employee.dialog.component';
import { EnumResponse } from 'src/app/layout/api/enum';
import { Table } from 'primeng/table';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [DialogService]
})
export class EmployeeComponent implements OnInit {

  employees: EmployeeResponse[] = [];
  employeeCategories: EnumResponse[] = [];
  dropdownOptionPlaceholder: string = "Select category";
  dropdownOptionLabel: string = "nameEn";
  currentCategory: EnumResponse;
  genders: EnumResponse[] = [];
  loading: boolean = true;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private employeeService: EmployeeService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.loadEmployees();
    this.loadGenders();
  }

  loadEmployees(){
    this.loading = true;
    this.employeeService.getAll(this.currentCategory?.id?.toString() ?? '1').subscribe({
        next: (employees: EmployeeResponse[]) => {
          this.employees = employees;
          this.loading = false;
        },
        error: (error: any) => {
          console.error('Error fetching employees', error);
          this.loading = false;
        }
    });
  }

  loadCategories(){
    this.baseApiService.getEmployeeCategories().subscribe({
        next: (categories: EnumResponse[]) => {
          this.employeeCategories = categories;
          this.currentCategory = this.employeeCategories[0];
          this.dropdownOptionPlaceholder = this.currentCategory.nameEn;
        },
        error: (error: any) => {
          console.error('Error fetching employee categories', error);
        }
    });
  }

  onSortChange(event: any){
    this.currentCategory = this.employeeCategories.find(x => x.id === event.value);
    this.loadEmployees();
  }

  loadGenders(){
    this.baseApiService.getGenders().subscribe({
        next: (genders: EnumResponse[]) => {
          this.genders = genders;
        },
        error: (error: any) => {
          console.error('Error fetching genders', error);
        }
    });
  }

  createEmployee(){
    const ref = this.dialogService.open(CreateEmployeeDialogComponent, {
        header: 'Create New Employee',
        width: '80%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        data: {
            genders: this.genders,
            employeeCategories: this.employeeCategories
        }
      });

    ref.onClose.subscribe({
        next: (data: EmployeeCreateRequest) => {
            if (data) {
              this.employeeService.create(data).subscribe({
                  next: () => {
                      this.loadEmployees();
                      console.log('Employee created successfully');
                  },
                  error: (error: Error) => {
                      console.error('Error creating employee', error);
                  }
              });
            }
        }
    });
  }

  updateEmployee(employee: EmployeeResponse){
    const ref = this.dialogService.open(UpdateEmployeeDialogComponent, {
        header: 'Update the Employee',
        width: '70%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        data: {
            employee: employee,
            categories: this.employeeCategories,
            genders: this.genders
        }
      });

    ref.onClose.subscribe({
        next: (data: EmployeeUpdateRequest) => {
            if (data) {
              this.employeeService.update(data).subscribe({
                  next: () => {
                      this.loadEmployees();
                      console.log('Employee updated successfully');
                  },
                  error: (error: Error) => {
                      console.error('Error updating employee', error);
                  }
              });
            }
        }
      });
  }

  deleteEmployee(id: string) {
    const deleteRequest: EmployeeDeleteRequest = { id };
    this.employeeService.delete(deleteRequest).subscribe({
        next: (response: boolean) => {
            if (response) {
                this.loadEmployees();
            } else {
                console.error('Error deleting employee');
            }
        },
        error: (error: Error) => {
            console.error('Error deleting employee', error);
        }
    });
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
    table.clear();
    this.filter.nativeElement.value = '';
  }
}
