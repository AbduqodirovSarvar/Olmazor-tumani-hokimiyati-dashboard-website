import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: this.translateService.instant("HOME"),
                items: [
                    // { label: this.translateService.instant("DASHBOARD"), icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                    { label: this.translateService.instant("ABOUT"), icon: 'pi pi-fw pi-info-circle', routerLink: ['/about'] },
                    { label: this.translateService.instant("SLIDES"), icon: 'pi pi-images', routerLink: ['/slides'] },
                    { label: this.translateService.instant("POSTS") + " " + this.translateService.instant("AND") + " " + this.translateService.instant("NEWS"), icon: 'pi pi-file', routerLink: ['/posts'] },
                    { label: this.translateService.instant("SECTORS"), icon: 'pi pi-map', routerLink: ['/sectors'] },
                    { label: this.translateService.instant("ADDRESS"), icon: 'pi pi-map-marker', routerLink: ['/address'] },
                    { label: this.translateService.instant("EMPLOYEES"), icon: 'pi pi-users', routerLink: ['/employees'] },
                    { label: this.translateService.instant("CONTACT"), icon: 'pi pi-fw pi-envelope', routerLink: ['/contacts'] },
                    { label: this.translateService.instant("USEFULL_LINKS"), icon: 'pi pi-link', routerLink: ['/usefull-links'] },
                    { label: this.translateService.instant("USERS"), icon: 'pi pi-user', routerLink: ['/users'] },
                ]
            }
        ];
    }
}
