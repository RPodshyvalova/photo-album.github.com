import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {Catalog} from "../../models/catalog";
import {ApiService} from "../../services/api.service";

@Component({
    selector: "main-form",
    templateUrl: "main.component.html",
    styleUrls: ["main.component.css"]
})

export class MainComponent implements OnInit {
    private message: string;
    private catalogs: Catalog[] = []; 
    
    constructor(
        private apiService: ApiService) {
    }
    
    ngOnInit(): void {
        this.getCatalogsList();
        
    }
    
    getCatalogsList() {
        let url = "http://localhost:8080/src/app/data/catalogs.json";
        this.apiService.getPromise(url)
            .then((data: any) => {
                this.catalogs = data as Catalog[];
                console.log(this.catalogs);
            });
    } 
    
    getConnection() {
        console.log("from get connection method");
        this.apiService.connect()
            .subscribe(
                (data: any) => {
                    console.log(data);
                },
                (error: any) => {
                    console.log(<any>error);
                    this.message = "Sorry, but something is wrong... " + <any>error;
                }
            );
    }
}