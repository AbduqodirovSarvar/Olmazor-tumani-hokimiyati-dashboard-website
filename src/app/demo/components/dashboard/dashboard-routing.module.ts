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
        { path: '', redirectTo: '/about', pathMatch: 'full' },
        // { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
        { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
        { path: 'slides', component: SlidesComponent, canActivate: [AuthGuardService] },
        { path: 'posts', component: PostsComponent, canActivate: [AuthGuardService] },
        { path: 'sectors', component: SectorsComponent, canActivate: [AuthGuardService] },
        { path: 'address', component: AddressComponent, canActivate: [AuthGuardService] },
        { path: 'employees', component: EmployeeComponent, canActivate: [AuthGuardService] },
        { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardService] },
        { path: 'usefull-links', component: UsefullLinkComponent, canActivate: [AuthGuardService] },
        { path: 'users', component: UsersComponent, canActivate: [AuthGuardService] }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
