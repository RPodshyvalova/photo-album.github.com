import {NgModule} from "@angular/core";
import {MainComponent} from "./main/main.component";
import {CommonModule} from '@angular/common';
import {CatalogModule} from "./catalog/catalog.module";
import {ApiService} from "../services/api.service";

@NgModule({
    imports: [
        CommonModule,
        CatalogModule
    ],
    declarations: [
        MainComponent,
    ],
    bootstrap: [ ],
    exports: [ 
        MainComponent,
    ],
    providers: [
        ApiService
    ]
})
export class HomeModule {   
}

