import { Injectable } from '@angular/core';
import {BehaviorSubject, firstValueFrom, Observable, tap, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import * as bcrypt from 'bcryptjs';
import {AppRoutingModule} from "./app-routing/app-routing.module";
import {Router} from "@angular/router";
import axios from 'axios';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  constructor() { }

  login(user: string, pass: string): Promise<any> {
    return axios.post('/login', { username: user, password: pass })
  }

  register(username:string, password:string, email:string): Promise<any>{
    return axios.post('/register', {username: username, password:password, email:email})
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('jwt');
  }
}
