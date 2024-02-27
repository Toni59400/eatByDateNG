import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, tap, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {Router} from "@angular/router";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json', // Exemple d'en-tête standard
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  async login(user: string, pass: string): Promise<void> {
    try {
      const response: any = await firstValueFrom(this.http.post('http://localhost:8081/login', { username: user, password: pass }, httpOptions))
      console.log(response);
      const jwtToken = response;
      if (jwtToken) {
        localStorage.setItem('jwt', jwtToken);
        this.isLoggedInSubject.next(true);
        this.router. navigate(['/accueil'])
      } else {
        throw new Error('JWT absent dans la réponse');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      throw error;
    }
  }

  logout() {
    this.isLoggedInSubject.next(false);
    localStorage.removeItem('jwt');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
