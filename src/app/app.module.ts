import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";

import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";

import "bootstrap/dist/css/bootstrap.css";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HomeModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [ 
    ],
    bootstrap: [AppComponent]
})

export class AppModule {}