import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RequestLogin} from './login.model';
import { Observable } from 'rxjs';
import { ResponseLogin } from './responseLogin';

@Injectable({
  providedIn:'root'
})
export class LoginService{
  constructor( private httpClient: HttpClient){}
  public doLogin(requestLogin: RequestLogin): Observable<ResponseLogin>{
    return this.httpClient.post<ResponseLogin>('http://localhost:3000/api/autenticacao',
    requestLogin
    );
  }
}
