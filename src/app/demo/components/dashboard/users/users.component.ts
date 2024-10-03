import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { CreateUserRequest, DeleteUserRequest, UpdateUserRequest, UserResponse } from 'src/app/layout/api/user';
import { UserService } from 'src/app/layout/service/user.service';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { EnumResponse } from 'src/app/layout/api/enum';
import { CreateUserDialogComponent } from './create.user.dialog/create.user.dialog.component';
import { UpdateUserDialogComponent } from './update.user.dialog/update.user.dialog.component';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-users',

  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class UsersComponent implements OnInit {

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

  users: UserResponse[] = [];
  userRoles: EnumResponse[] = [];
  genders: EnumResponse[] = [];

  @ViewChild('filter') filter!: ElementRef;

  constructor(
    private customerService: CustomerService, 
    private productService: ProductService,
    private userService: UserService,
    private dialogService: DialogService,
    private baseApiService: BaseApiService
  ) { }

  ngOnInit() {
    this.loadUsers();
    this.loadRoles();
    this.loadGenders();
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

  loadUsers(){
    this.userService.getAll().subscribe({
        next: (users: UserResponse[]) => {
          this.users = users;
        },
        error: (error: any) => console.error('Error retrieving users', error)
      });
  }

  loadRoles(){
    this.baseApiService.getUserRoles().subscribe({
      next: (data: EnumResponse[]) => {
        this.userRoles = data;
      },
      error: (error: any) => console.error('Error retrieving user roles', error)
    });
  }

  loadGenders(){
    this.baseApiService.getGenders().subscribe({
      next: (data: EnumResponse[]) => {
        this.genders = data;
      },
      error: (error: any) => console.error('Error retrieving genders', error)
    });
  }

  create(){
    const ref = this.dialogService.open(CreateUserDialogComponent, {
      header: 'Create New User',
      width: '80%',
      contentStyle: { 'overflow-y': 'auto' },
      data: {
        userRoles: this.userRoles,
        genders: this.genders
      }
    });

    ref.onClose.subscribe({
      next: (data: CreateUserRequest) => {
        this.userService.create(data).subscribe({
          next: (user: UserResponse) => {
            this.loadUsers();
          },
          error: (error: any) => console.error('Error creating user', error)
        });
      },
      error: (error: any) => console.error('Error closing dialog', error)
    });
  }

  update(user: UserResponse){
    const ref = this.dialogService.open(UpdateUserDialogComponent, {
      header: 'Update User',
      width: '80%',
      contentStyle: { 'overflow-y': 'auto' },
      data: {
        user: user,
        userRoles: this.userRoles,
        genders: this.genders
      }
    });

    ref.onClose.subscribe({
      next: (data: UpdateUserRequest) => {
        console.log(data);
        this.userService.update(data).subscribe({
          next: (user: UserResponse) => {
            this.loadUsers();
          },
          error: (error: any) => console.error('Error updating user', error)
        });
      },
      error: (error: any) => console.error('Error closing dialog', error)
    });
  }

  delete(id: string){
    const deleteUserRequest: DeleteUserRequest = {
        id: id
    }

    this.userService.delete(deleteUserRequest).subscribe({
        next: (data: boolean) => {
          if(data){
            this.loadUsers();
          }
        },
        error: (error: any) => console.error('Error deleting user', error)
      });
  }

  getPhoto(id: string): string{
    return this.baseApiService.getPhoto(id);
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