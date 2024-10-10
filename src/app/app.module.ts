import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpConfigInterceptorService } from './layout/service/http-config-interceptor.service';
import { AppTopBarComponent } from './layout/app.topbar.component';
import { MenuModule } from 'primeng/menu';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslationLoader } from './layout/translate-loader';

@NgModule({
    declarations: [AppComponent, NotfoundComponent],
    imports: [AppRoutingModule, AppLayoutModule, MenuModule, HttpClientModule,
        TranslateModule.forRoot({
            loader: {
              provide: TranslateLoader,
              useFactory: (http: HttpClient) => new TranslationLoader(http),
              deps: [HttpClient]
            }
          }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpConfigInterceptorService,
            multi: true
          },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
