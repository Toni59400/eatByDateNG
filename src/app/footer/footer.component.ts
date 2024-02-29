import {Component, OnInit} from '@angular/core';
import {FooterService} from "../footer.service";
import {async} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit{
    appVersion : string | undefined;

  constructor(private service: FooterService) {
    this.service = service;
  }

  ngOnInit() {
    this.service.getFooterInfo().then(async ({data}) =>{
      this.appVersion = data
    })
  }

}
