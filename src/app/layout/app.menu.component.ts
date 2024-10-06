import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: "HOME",
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] },
                    { label: 'About', icon: 'pi pi-fw pi-info-circle', routerLink: ['/about'] },
                    { label: 'Slides', icon: 'pi pi-images', routerLink: ['/slides'] },
                    { label: 'Posts and News', icon: 'pi pi-file', routerLink: ['/posts'] },
                    { label: 'Sectors', icon: 'pi pi-map', routerLink: ['/sectors'] },
                    { label: 'Address', icon: 'pi pi-map-marker', routerLink: ['/address'] },
                    { label: 'Employees', icon: 'pi pi-users', routerLink: ['/employees'] },
                    { label: 'Contact', icon: 'pi pi-fw pi-envelope', routerLink: ['/contacts'] },
                    { label: 'Usefull Links', icon: 'pi pi-link', routerLink: ['/usefull-links'] },
                    { label: "Users", icon: 'pi pi-user', routerLink: ['/users'] },
                ]
            }
        ];
    }
}
