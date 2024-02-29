import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  mess: string = "Se connecter";
  messCSS: string = "connect";
  jwt : string | null = "";

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      if(val.url) {
        if (this.authService.isAuthenticated() && !val.url.includes("login") ) {
          this.jwt = localStorage.getItem("jwt");
          this.mess = "Se deconnecter";
          this.messCSS = "deconnect"
        } else {
          this.mess = "Se connecter";
          this.messCSS = "connect"
        }
      }
    });

  }

  logF(): void {
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/login'])
      localStorage.removeItem("jwt")
      this.jwt = null;
    } else {
      this.router.events.subscribe((val: any) => {
        if(val.url) {
          if(val.url.includes("login") ){
            this.router.navigate(['/register'])
          }else{
            this.router.navigate(['/login'])
          }
        }
      });
    }
  }
}
