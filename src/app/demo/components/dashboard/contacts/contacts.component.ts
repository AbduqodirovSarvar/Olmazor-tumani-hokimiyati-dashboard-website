import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Customer, Representative } from 'src/app/demo/api/customer';
import { CustomerService } from 'src/app/demo/service/customer.service';
import { Product } from 'src/app/demo/api/product';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ContactResponse, CreateContactCommand, DeleteContactCommand, UpdateContactCommand } from 'src/app/layout/api/contact';
import { EnumResponse } from 'src/app/layout/api/enum';
import { ContactService } from 'src/app/layout/service/contact.service';
import { BaseApiService } from 'src/app/layout/service/base.api.service';
import { DialogService } from 'primeng/dynamicdialog';
import { HelperService } from 'src/app/layout/service/helper.service';
import { CreateContactDialogComponent } from './create.contact.dialog/create.contact.dialog.component';
import { UpdateContactDialogComponent } from './update.contact.dialog/update.contact.dialog.component';
import { TranslateService } from '@ngx-translate/core';

interface expandedRows {
  [key: string]: boolean;
}

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class ContactsComponent implements OnInit {

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

  @ViewChild('filter') filter!: ElementRef;

  contacts: ContactResponse[] = [];
  types: EnumResponse[] = [];

  constructor(
    private customerService: CustomerService, 
    private productService: ProductService,
    private contactService: ContactService,
    private baseApiService: BaseApiService,
    public helperService: HelperService,
    private dialogService: DialogService,
    private translate: TranslateService
) { }

  ngOnInit() {
    this.loadTypes();
    this.loadContacts();
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

  loadContacts(){
    this.contactService.getAll().subscribe({
        next: (data: ContactResponse[]) => {
            this.contacts = data;
        },
        error: (error: any) => console.error('Error retrieving contacts:', error)
    });
  }

  loadTypes(){
    this.baseApiService.getContactTypes().subscribe({
        next: (data: EnumResponse[]) => {
            this.types = data;
        },
        error: (error: any) => console.error('Error retrieving types:', error)
    });
  }

  create(){
    const ref = this.dialogService.open(CreateContactDialogComponent, {
        header: this.translate.instant('CREATE_NEW'),
        width: '70%',
        contentStyle: { 'overflow-y': 'auto' },
        data: {
            types: this.types
        }
    });

    ref.onClose.subscribe({
        next: (data: CreateContactCommand) => {
            this.contactService.create(data).subscribe({
                next: (data: ContactResponse) => {
                    console.log('Contact created successfully');
                    this.loadContacts();
                },
                error: (error: any) => console.error('Error creating contact:', error)
            });
        },
        error: (error: any) => console.error('Error closing dialog:', error)
    });
  }

  update(contact: ContactResponse){
    const ref = this.dialogService.open(UpdateContactDialogComponent, {
        header: this.translate.instant('UPDATE'),
        width: '70%',
        contentStyle: { 'overflow-y': 'auto' },
        data: {
            contact: contact,
            types: this.types
        }
    });

    ref.onClose.subscribe({
        next: (data: UpdateContactCommand) => {
            this.contactService.update(data).subscribe({
                next: (data: ContactResponse) => {
                    console.log('Contact updated successfully');
                    this.loadContacts();
                },
                error: (error: any) => console.error('Error updating contact:', error)
            });
        },
        error: (error: any) => console.error('Error closing dialog:', error)
    });
  }

  delete(id: string) {
    const deleteContactRequest: DeleteContactCommand = {
        id: id
    }
    this.contactService.delete(deleteContactRequest).subscribe({
        next: (data: boolean) => {
            console.log('Contact deleted successfully');
            this.loadContacts();
        },
        error: (error: any) => console.error('Error deleting contact:', error)
    });
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
