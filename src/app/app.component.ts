import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { HelperService } from './layout/service/helper.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

    constructor(private primengConfig: PrimeNGConfig, 
        private tr: TranslateService,
        private hs: HelperService
    ) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.tr.setDefaultLang(this.hs.getLanguageCode());
    }
}
