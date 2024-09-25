import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { EmployeeCreateRequest, EmployeeDeleteRequest, EmployeeResponse, EmployeeUpdateRequest } from 'src/app/layout/api/employee';
import { EmployeeService } from 'src/app/layout/service/employee.service';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { HelperService } from 'src/app/layout/service/helper.service';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateEmployeeDialogComponent } from './create.employee.dialog/create.employee.dialog.component';
import { UpdateEmployeeDialogComponent } from './update.employee.dialog/update.employee.dialog.component';
import { EnumResponse } from 'src/app/layout/api/enum';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class EmployeeComponent implements OnInit {

  customers1: Customer[] = [];

  customers2: Customer[] = [];

  customers3: Customer[] = [];

  selectedCustomers1: Customer[] = [];

  selectedCustomer: Customer = {};

  representatives: Representative[] = [];

  statuses: any[] = [];

  products: Product[] = [];

  rowGroupMetadata: any;

  expandedRows: expandedRows = {};

  activityValues: number[] = [0, 100];

  isExpanded: boolean = false;

  idFrozen: boolean = false;

  loading: boolean = true;

  employees: EmployeeResponse[] = [];
  employeeCategories: EnumResponse[] = [];
  dropdownOptionPlaceholder: string = "Select category";
  dropdownOptionLabel: string = "nameEn";
  currentCategory: EnumResponse;

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private customerService: CustomerService,
    private productService: ProductService,
    private employeeService: EmployeeService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService
    ) { }

  ngOnInit() {
    this.loadEmployees();
    this.loadCategories();
      this.customerService.getCustomersLarge().then(customers => {
          this.customers1 = customers;
          this.loading = false;

          // @ts-ignore
          this.customers1.forEach(customer => customer.date = new Date(customer.date));
      });
      this.customerService.getCustomersMedium().then(customers => this.customers2 = customers);
      this.customerService.getCustomersLarge().then(customers => this.customers3 = customers);
      this.productService.getProductsWithOrdersSmall().then(data => this.products = data);

      this.representatives = [
          { name: 'Amy Elsner', image: 'amyelsner.png' },
          { name: 'Anna Fali', image: 'annafali.png' },
          { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
          { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
          { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
          { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
          { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
          { name: 'Onyama Limba', image: 'onyamalimba.png' },
          { name: 'Stephen Shaw', image: 'stephenshaw.png' },
          { name: 'XuXue Feng', image: 'xuxuefeng.png' }
      ];

      this.statuses = [
          { label: 'Unqualified', value: 'unqualified' },
          { label: 'Qualified', value: 'qualified' },
          { label: 'New', value: 'new' },
          { label: 'Negotiation', value: 'negotiation' },
          { label: 'Renewal', value: 'renewal' },
          { label: 'Proposal', value: 'proposal' }
      ];
  }

  loadEmployees(){
    this.employeeService.getAll().subscribe({
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

  createEmployee(){
    const ref = this.dialogService.open(CreateEmployeeDialogComponent, {
        header: 'Create New Employee',
        width: '70%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
      });

    ref.onClose.subscribe({
        next: (data: EmployeeCreateRequest) => {
            this.employeeService.create(data).subscribe({
                next: (employee: EmployeeResponse) => {
                    this.loadEmployees();
                    console.log('Employee created successfully', employee);
                },
                error: (error: Error) => {
                    console.error('Error creating employee', error);
                }
            });
        }
    });
  }

  updateEmployee(employee: EmployeeResponse){
    const ref = this.dialogService.open(UpdateEmployeeDialogComponent, {
        header: 'Update the Employee',
        width: '70%',
        contentStyle: { 'max-height': '500px', overflow: 'auto' },
        data: {employee: employee }
      });

      ref.onClose.subscribe({
        next: (data: EmployeeUpdateRequest) => {
            this.employeeService.update(data).subscribe({
                next: (employee: EmployeeResponse) => {
                    this.loadEmployees();
                    console.log('Employee updated successfully', employee);
                },
                error: (error: Error) => {
                    console.error('Error updating employee', error);
                }
            });
        }
      });
  }

  deleteEmployee(id: string) {
    const deleteRequest: EmployeeDeleteRequest = {
        id: id
    };
    this.employeeService.delete(deleteRequest).subscribe({
        next: (response: boolean) => {
            if(response){
                this.loadEmployees();
            }else{
                console.log('Error deleting employee');
            }
        },
        error: (error: Error) => {
            console.error('Error deleting employee', error);
        }
    })
  }

  onSort() {
      this.updateRowGroupMetaData();
  }

  updateRowGroupMetaData() {
      this.rowGroupMetadata = {};

      if (this.customers3) {
          for (let i = 0; i < this.customers3.length; i++) {
              const rowData = this.customers3[i];
              const representativeName = rowData?.representative?.name || '';

              if (i === 0) {
                  this.rowGroupMetadata[representativeName] = { index: 0, size: 1 };
              }
              else {
                  const previousRowData = this.customers3[i - 1];
                  const previousRowGroup = previousRowData?.representative?.name;
                  if (representativeName === previousRowGroup) {
                      this.rowGroupMetadata[representativeName].size++;
                  }
                  else {
                      this.rowGroupMetadata[representativeName] = { index: i, size: 1 };
                  }
              }
          }
      }
  }

  expandAll() {
      if (!this.isExpanded) {
          this.products.forEach(product => product && product.name ? this.expandedRows[product.name] = true : '');

      } else {
          this.expandedRows = {};
      }
      this.isExpanded = !this.isExpanded;
  }

  formatCurrency(value: number) {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  }

  onGlobalFilter(table: Table, event: Event) {
      table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  clear(table: Table) {
      table.clear();
      this.filter.nativeElement.value = '';
  }
  
}
