import {Injectable} from '@angular/core';
import axios from "axios";

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
}
