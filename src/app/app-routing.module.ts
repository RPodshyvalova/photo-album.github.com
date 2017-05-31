import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {MainComponent} from "./home/main/main.component";
import {CatalogContentComponent} from "./home/catalog/catalog-content/catalog-content.component";
import {ImageComponent} from "./home/catalog/image/image.component";

const routes: Routes = [
    { path: "", redirectTo: "/main", pathMatch: "full" },
    { path: "main",  component: MainComponent },
    { path: "catalog-detail/:title", component: CatalogContentComponent },
    { path: "catalog-detail/:title/:id", component: ImageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {
}