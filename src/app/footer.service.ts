import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor() { }

  getFooterInfo(): Promise<any>{
      return axios.get("/version")
  }
}
