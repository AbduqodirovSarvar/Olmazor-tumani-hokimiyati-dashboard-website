import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AboutComponent } from './about/about.component';
import { SlidesComponent } from './slides/slides.component';
import { PostsComponent } from './posts/posts.component';
import { SectorsComponent } from './sectors/sectors.component';
import { AddressComponent } from './address/address.component';
import { EmployeeComponent } from './employee/employee.component';
import { UsefullLinkComponent } from './usefull-link/usefull-link.component';
import { UsersComponent } from './users/users.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AuthGuardService } from 'src/app/layout/service/auth.guard.service';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
        { path: 'about', component: AboutComponent },
        { path: 'slides', component: SlidesComponent },
        { path: 'posts', component: PostsComponent },
        { path: 'sectors', component: SectorsComponent },
        { path: 'address', component: AddressComponent },
        { path: 'employees', component: EmployeeComponent },
        { path: 'contacts', component: ContactsComponent },
        { path: 'usefull-links', component: UsefullLinkComponent },
        { path: 'users', component: UsersComponent }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
