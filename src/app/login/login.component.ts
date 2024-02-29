import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthServiceService} from "../auth-service.service";
import {NotificationService} from "../notification.service";
import {Router} from "@angular/router";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss'],
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, ReactiveFormsModule],

})
export class LoginComponent {
  hide = true;
  email: FormControl<string | null> = new FormControl('', [Validators.required, Validators.email]);

  constructor(private authService: AuthServiceService, private notificationService: NotificationService, private router:Router) {
  }

  onLoginSubmit(password: string, event: Event) {
    event.preventDefault();
    try {
      this.authService.login(this.email.getRawValue()!, password).then(async ({ data }) => {
        localStorage.setItem("jwt", data.jwt);
        await this.notificationService.showSuccess("Vous êtes connecté !");
        this.router.navigateByUrl('/accueil')
        return data;
      }).catch(async error => {
        await this.notificationService.showError("Erreur de connexion");
        console.error(error);
        return error;
      });
    } catch (error) {
      console.error(error);
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
}


