import {Injectable} from '@angular/core';
import axios from "axios";


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
  id: any;
  reserve: Reserve;
  apiId: string;
  expirationDate: string;
  quantite: number;
}

export interface AddProd{
  reserve: Reserve;
  apiId: string;
  expirationDate: string;
  quantite: number;
}
@Injectable({
  providedIn: 'root'
})
export class AccueilService{

  constructor() { }



  getReserve(idUser: number): Promise<any>{
    return axios.get("/reserves/byUser/"+idUser.toString())
  }

  getProductOfReserve(idReserve: number): Promise<any>{
    return axios.get("/products/reserve/"+idReserve.toString())
  }

  getProductName(idProd: number): Promise<any>{
    return axios.get("/product/"+idProd.toString())
  }

  saveProduct(produit: Product): Promise<any> {
    return axios.post('/products/save', {"id": produit.id,
      "reserve": produit.reserve,
      "apiId": produit.apiId,
      "expirationDate": produit.expirationDate,
      "quantite": produit.quantite,})
  }

  getReserveById(id: number): Promise<any>{
    return axios.get("/reserves/"+id.toString())
  }

  add(produit: AddProd): Promise<any> {
    return axios.post('/products/save', {"reserve": produit.reserve,
      "apiId": produit.apiId,
      "expirationDate": produit.expirationDate,
      "quantite": produit.quantite,})
  }
}
