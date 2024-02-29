import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthServiceService} from "../auth-service.service";
import {NotificationService} from "../notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule]
})
export class RegisterComponent {

  hide: boolean = true;

  constructor(private authService: AuthServiceService, private notif:NotificationService, private router:Router) {
  }
  onRegisterSubmit(username:string, email:string, password:string, event:SubmitEvent){
    event.preventDefault();
    try {
      this.authService.register(username, password, email).then(async ({ data }) => {
        localStorage.setItem("jwt", data.jwt);
        await this.notif.showSuccess("Vous êtes inscris !");
        this.router.navigateByUrl('/accueil')
        return data;
      }).catch(async error => {
        await this.notif.showError("Erreur lors de l'inscription");
        console.error(error);
        return error;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
