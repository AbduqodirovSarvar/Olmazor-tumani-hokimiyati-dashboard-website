import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { AboutComponent } from './about/about.component';
import { AddressComponent } from './address/address.component';
import { ContactsComponent } from './contacts/contacts.component';
import { EmployeeComponent } from './employee/employee.component';
import { PostsComponent } from './posts/posts.component';
import { SectorsComponent } from './sectors/sectors.component';
import { SlidesComponent } from './slides/slides.component';
import { UsefullLinkComponent } from './usefull-link/usefull-link.component';
import { UsersComponent } from './users/users.component';
import { ListDemoRoutingModule } from '../uikit/list/listdemo-routing.module';
import { DataViewModule } from 'primeng/dataview';
import { PickListModule } from 'primeng/picklist';
import { OrderListModule } from 'primeng/orderlist';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { TableDemoRoutingModule } from '../uikit/table/tabledemo-routing.module';
import { SliderModule } from 'primeng/slider';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { RippleModule } from 'primeng/ripple';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { CreateAboutDialogComponent } from './about/create.about.dialog/create.about.dialog.component';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { UpdateAboutDialogComponent } from './about/update.about.dialog/update.about.dialog.component';
import { CreatePostDialogComponent } from './posts/create.post.dialog/create.post.dialog.component';
import { UpdatePostDialogComponent } from './posts/update.post.dialog/update.post.dialog.component';
import { CreateEmployeeDialogComponent } from './employee/create.employee.dialog/create.employee.dialog.component';
import { UpdateEmployeeDialogComponent } from './employee/update.employee.dialog/update.employee.dialog.component';
import { UpdateAddressDialogComponent } from './address/update.address.dialog/update.address.dialog.component';
import { CreateAddressDialogComponent } from './address/create.address.dialog/create.address.dialog.component';
import { UpdateContactDialogComponent } from './contacts/update.contact.dialog/update.contact.dialog.component';
import { CreateContactDialogComponent } from './contacts/create.contact.dialog/create.contact.dialog.component';
import { CreateSectorDialogComponent } from './sectors/create.sector.dialog/create.sector.dialog.component';
import { UpdateSectorDialogComponent } from './sectors/update.sector.dialog/update.sector.dialog.component';
import { CreateSlideDialogComponent } from './slides/create.slide.dialog/create.slide.dialog.component';
import { UpdateSlideDialogComponent } from './slides/update.slide.dialog/update.slide.dialog.component';
import { UpdateUsefullLinkDialogComponent } from './usefull-link/update.usefull-link.dialog/update.usefull-link.dialog.component';
import { CreateUsefullLinkDialogComponent } from './usefull-link/create.usefull-link.dialog/create.usefull-link.dialog.component';
import { CreateUserDialogComponent } from './users/create.user.dialog/create.user.dialog.component';
import { UpdateUserDialogComponent } from './users/update.user.dialog/update.user.dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
    imports: [
		ListDemoRoutingModule,
		DataViewModule,
		PickListModule,
		OrderListModule,
		InputTextModule,
		DropdownModule,
		RatingModule,
		ButtonModule,
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        DashboardsRoutingModule,
		TableDemoRoutingModule,
		SliderModule,
		ToggleButtonModule,
		RippleModule,
		MultiSelectModule,
		ProgressBarModule,
		ToastModule,
        DynamicDialogModule,
        DialogModule,
        ReactiveFormsModule,
        FormsModule,
        InputTextareaModule,
        TranslateModule,
        CalendarModule
    ],
    declarations: [
        DashboardComponent,
        AboutComponent,
        AddressComponent,
        ContactsComponent,
        EmployeeComponent,
        PostsComponent,
        SectorsComponent,
        SlidesComponent,
        UsefullLinkComponent,
        UsersComponent,
        CreateAboutDialogComponent,
        UpdateAboutDialogComponent,
        CreatePostDialogComponent,
        UpdatePostDialogComponent,
        CreateEmployeeDialogComponent,
        UpdateEmployeeDialogComponent,
        UpdateAddressDialogComponent,
        CreateAddressDialogComponent,
        UpdateContactDialogComponent,
        CreateContactDialogComponent,
        CreateSectorDialogComponent,
        UpdateSectorDialogComponent,
        CreateSlideDialogComponent,
        UpdateSlideDialogComponent,
        UpdateUsefullLinkDialogComponent,
        CreateUsefullLinkDialogComponent,
        CreateUserDialogComponent,
        UpdateUserDialogComponent,
    ],
    providers: [DialogService]
})
export class DashboardModule { }
