import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {HomeComponent} from "../home/home.component";

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: "accueil", component: HomeComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    RouterModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
