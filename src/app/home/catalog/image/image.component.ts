import {Component, OnInit, Input} from "@angular/core";
import {Router} from "@angular/router";
import {Image} from "../../../models/image";
import {ApiService} from "../../../services/api.service";
import {ActivatedRoute, Params} from "@angular/router";
import {Location} from "@angular/common";

@Component({
    selector: "image",
    templateUrl: "image.component.html",
    styleUrls: ["image.component.css"]
})

export class ImageComponent implements OnInit {
    private imageId: number;
    private catalogTitle: any;
    private img: Image;
    
    constructor(
        private apiService: ApiService,
        private location: Location,
        private route: ActivatedRoute,
        private router: Router) {
    }
    
    ngOnInit(): void {
        this.imageId = parseInt(decodeURIComponent(this.route.snapshot.params["id"]));
        this.catalogTitle =  decodeURIComponent(this.route.snapshot.params["title"]);

        this.getImageInfo();
    }
       
    getImageInfo(): void {
        let url = "http://localhost:8080/src/app/data/" + this.catalogTitle + ".json";
        this.apiService.getPromise(url)
            .then((data: any) => {
                return data as Image[];
            })
            .then((arr: Image[]) => {
                arr.forEach((item: Image) => {
                    if (item.id == this.imageId){
                        this.img = item;    
                    }
                });
            });
    }
   
    goBack(): void {
        this.router.navigate(["/catalog-detail", this.catalogTitle]);
    }
}