import {Component, OnInit} from '@angular/core';
import {User} from "../user";
import {AccueilService} from "../accueil.service";
import {MatTableDataSource} from "@angular/material/table";


export interface ReserveType{
  id:number;
  name:string;
}

export interface Reserve{
  id:number;
  ReserveNom: string;
  reserveType: ReserveType;
}

export interface Product{
  id: number;
  reserve: Reserve;
  apiId: string;
  expirationDate: string;
  quantite: number;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  jwt: string | null = "";
  nameUser: string| null = "";
  idUser: number| null = null;
  isReady: boolean = false;
  isReeadyStock: boolean = false;
  reserves: any[] = [];
  products: Product[] = [];
  selectedReserve: number | null = null;
  constructor(private accueilService: AccueilService) {
  }

  ngOnInit() {
    this.jwt = localStorage.getItem("jwt");
    if (this.jwt) {
      const parts = this.jwt.split('.');
      const payload = parts[1];
      const decodedPayload = atob(payload);
      const payloadObject = JSON.parse(decodedPayload);
      this.nameUser = payloadObject.sub;
      this.idUser = payloadObject.id;


      // Fetch data
      this.fetchUserReserve();
      }
    }

    fetchUserReserve(){
      this.accueilService.getReserve(this.idUser!).then(async ({data}) =>{
        this.reserves = data
        if (!this.isReeadyStock){
          this.isReeadyStock = !this.isReeadyStock
        }
      })
    }

    fetchProductOfReserve(idReserve: number){
    localStorage.setItem("reserve", idReserve.toString())

      this.accueilService.getProductOfReserve(idReserve).then(async ({data}) =>{
        this.products = data

        for (const product of data) {
          const genericName = await this.accueilService.getProductName(product.apiId);
          product.product_name = genericName.data.product_name;
          product.imgUrl = genericName.data.imageUrl;
          console.log(genericName)
        }


        this.products = data;
        if (this.isReady){
          this.isReady = true
        } else{
          this.isReady = true
        }
      })
    }


}
