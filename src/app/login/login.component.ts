import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthServiceService} from "../auth-service.service";
import {NotificationService} from "../notification.service";
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],

})
export class LoginComponent {
  hide = true;

  constructor(private authService: AuthServiceService, private notificationService: NotificationService) { }

  async onLoginSubmit(username: string, password: string, event: Event) {
    event.preventDefault();
    try {
      await this.authService.login(username, password);
      const jwtToken = localStorage.getItem('jwt');
      if (jwtToken) {
        await this.notificationService.showSuccess("Vous êtes connecté !")
        console.log('Connexion réussie !');
        console.log(localStorage)
      } else {
        await this.notificationService.showError("Erreur de connexion")
        console.error('La connexion a échoué.');
      }
    } catch (error) {
      await this.notificationService.showError("Erreur de connexion")
      console.error('Erreur lors de la connexion :', error);
      console.log(localStorage)
    }
  }
}
