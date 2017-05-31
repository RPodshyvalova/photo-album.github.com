import {Component, OnInit, Input} from "@angular/core";
import {Image} from "../../../models/image";
import {ApiService} from "../../../services/api.service";
import {Router, ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: "catalog-content",
    templateUrl: "catalog-content.component.html",
    styleUrls: ["catalog-content.component.css"]
})

export class CatalogContentComponent implements OnInit {
    private images: Image[] = []; 
    private catalogName: string;
    
    constructor(
        private apiService: ApiService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router) {
    }
    
    ngOnInit(): void {
        this.catalogName = decodeURIComponent(this.route.snapshot.params["title"]);
        this.getCatalogsImages(this.catalogName);  
    }

    getCatalogsImages(catalogName: string): void {
        let url = "http://localhost:8080/src/app/data/" + catalogName + ".json";
        this.apiService.getPromise(url)
            .then((data: any) => {
                this.images = data as Image[];
                console.log(this.images);
            });
    }
    
    getMoreInfo(id: number) {
        this.router.navigate(["/catalog-detail", this.catalogName, JSON.stringify(id)]);
    }
    
    goBack(): void {
//        this.location.back();
        this.router.navigate(["/main"]);
    }
}