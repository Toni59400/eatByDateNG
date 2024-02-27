import {Component, OnInit} from '@angular/core';
import {AuthServiceService} from "../auth-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  mess: string = "Se connecter";
  messCSS: string = "connect";
  jwt : string | null = "";

  constructor(private authService: AuthServiceService, private router: Router) { }

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isLoggedIn: boolean) => {
       this.jwt = localStorage.getItem("jwt");
      if(this.jwt != null){
        this.mess = "Se deconnecter";
        this.messCSS = "deconnect"
      }else{
        this.mess = "Se connecter";
        this.messCSS = "connect"
        this.logF()
      }
    });
  }



  logF(): void {
    console.log(this.isLoggedIn)
    console.log(localStorage)
    if(this.jwt != null) {
      this.isLoggedIn = !this.isLoggedIn;
      localStorage.removeItem("jwt")
      this.authService.logout();

      this.router.navigate(['/'])
    }else{
      this.router.navigate(['/'])
    }
  }
}
