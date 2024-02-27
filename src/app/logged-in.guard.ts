import {
  ActivatedRouteSnapshot,
  CanActivate, Router,
  RouterStateSnapshot,
} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthServiceService} from "./auth-service.service";
import {NotificationService} from "./notification.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthServiceService, private router: Router, private notif : NotificationService) {}

  canActivate() {
    if (this.authService.isLoggedIn$) {
      return true;
    } else {
      //this.router.navigateByUrl('/');
      return false;
    }
  }
}
