import {NgModule} from "@angular/core";
import {CatalogComponent} from "./catalog.component";
import {CatalogContentComponent} from "./catalog-content/catalog-content.component";
import {ImageComponent} from "./image/image.component";
import {CommonModule} from '@angular/common';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        CatalogComponent,
        CatalogContentComponent,
        ImageComponent
    ],
    bootstrap: [ ],
    exports: [ 
        CatalogComponent,
        CatalogContentComponent,
        ImageComponent   
    ],
    providers: [
    ]
})
export class CatalogModule {   
}

