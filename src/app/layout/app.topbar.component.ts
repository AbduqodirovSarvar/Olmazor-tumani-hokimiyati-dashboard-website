import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { MenubarModule } from 'primeng/menubar';
import { HelperService } from './service/helper.service';
import { DialogService } from 'primeng/dynamicdialog';
import { BaseApiService } from './service/base.api.service';
import { EnumResponse } from './api/enum';
import { UserService } from './service/user.service';
import { UpdateUserRequest, UserResponse } from './api/user';
import { dA } from '@fullcalendar/core/internal-common';
import { UpdateUserDialogComponent } from '../demo/components/dashboard/users/update.user.dialog/update.user.dialog.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit {

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    languageOptions: MenuItem[] = [
        { label: "O'zbekcha", icon: 'pi pi-check', command: () => this.changeLanguage('Uz') },
        { label: "English", icon: 'pi pi-check', command: () => this.changeLanguage('En') },
        { label: "Русский", icon: 'pi pi-check', command: () => this.changeLanguage('Ru') },
        { label: "Узбекча", icon: 'pi pi-check', command: () => this.changeLanguage('UzRu') },
    ];

    profileOptions: MenuItem[] = [
        { label: 'Profile', icon: 'pi pi-fw pi-user', command: () => this.clickProfile() },
        { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => this.clickLogOut() }
    ];

    genders: EnumResponse[] = [];
    userRoles: EnumResponse[] = [];
    currentUser!: UserResponse;

    constructor(
        public layoutService: LayoutService,
        private helperService: HelperService,
        private dialogService: DialogService,
        private baseApiService: BaseApiService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.baseApiService.getGenders().subscribe({
            next: (data) => this.genders = data,
            error: (error) => console.error('Error retrieving genders:', error)
        });
        this.baseApiService.getUserRoles().subscribe({
            next: (data) => this.userRoles = data,
            error: (error) => console.error('Error retrieving user roles:', error)
        });
        this.userService.getMe().subscribe({
            next: (data: UserResponse) => {
                this.currentUser = data;
            },
            error: (error) => console.error('Error retrieving current user:', error)
        });
    }

    changeLanguage(languageCode: string) {
        this.helperService.changeLanguage(languageCode);
        // localStorage.setItem('olmazor_language', languageCode);
        location.reload();
    }

    clickProfile() {
        const ref = this.dialogService.open(UpdateUserDialogComponent, {
            header: 'Create New User',
            width: '80%',
            contentStyle: { 'overflow-y': 'auto' },
            data: {
                user: this.currentUser,
                userRoles: this.userRoles,
                genders: this.genders
            }
        });

        ref.onClose.subscribe({
            next: (data: UpdateUserRequest) => {
                this.userService.update(data).subscribe({
                    next: (data: UserResponse) => {
                        location.reload();
                    },
                    error: (error) => console.error('Error updating user:', error)
                });
            },
            error: (error) => console.error('Error:', error)
        });
    }

    clickLogOut() {
        this.helperService.removeAccessToken();
        this.helperService.redirectToLoginPage();
    }
}
