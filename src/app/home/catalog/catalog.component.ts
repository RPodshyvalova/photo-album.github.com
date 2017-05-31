import {Component, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Catalog} from "../../models/catalog";

@Component({
    selector: "catalog",
    templateUrl: "catalog.component.html",
    styleUrls: ["catalog.component.css"]
})

export class CatalogComponent {
    @Input() catalog: Catalog;
  
    constructor(
        private router: Router) {
    }
    
    getMoreInfo() {
        this.router.navigate(["/catalog-detail", this.catalog.title]);
    }
}