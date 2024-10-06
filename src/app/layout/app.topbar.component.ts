import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { MenubarModule } from 'primeng/menubar';
import { HelperService } from './service/helper.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent {

    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    // Language options for the language menu
    languageOptions: MenuItem[] = [
        { label: 'Uzbek', icon: 'pi pi-check', command: () => this.changeLanguage('uz') },
        { label: 'English', icon: 'pi pi-check', command: () => this.changeLanguage('en') },
        { label: 'Russian', icon: 'pi pi-check', command: () => this.changeLanguage('ru') }
    ];

    // Profile options for the profile menu
    profileOptions: MenuItem[] = [
        { label: 'Profile', icon: 'pi pi-fw pi-user', command: () => this.clickProfile() },
        { label: 'Logout', icon: 'pi pi-fw pi-power-off', command: () => this.clickLogOut() }
    ];

    languages: any[] = [
        { label: 'Uzbek', value: 'uz' },
        { label: 'English', value: 'en' },
        { label: 'Russian', value: 'ru' }
      ];
    
      selectedLanguage: string = '';

    constructor(
        public layoutService: LayoutService,
        private helperService: HelperService
    ) { }

    // Methods for handling language selection
    changeLanguage(languageCode: string) {
        console.log('Selected Language: ', languageCode);
    }

    selectOption(languageCode: string) {
        console.log('Selected Option: ', languageCode);
    }

    onLanguageChange(event: any) {
        console.log('Selected Language: ', event.value);
      }

    // Methods for handling profile menu actions
    clickProfile() {
        console.log('Navigating to Profile page');
        // Add your logic to navigate to the profile page
    }

    clickLogOut() {
        this.helperService.removeAccessToken();
        this.helperService.redirectToLoginPage();
    }
}
