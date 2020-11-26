import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import{RequestLogin} from './login.model'
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public requestLogin : RequestLogin;
  constructor( private loginService: LoginService,
     private router :Router,
     private alertService:AlertService)
     {

      }


  ngOnInit(): void {
    this.requestLogin = new RequestLogin();
  }

  hide = true;

  public doLogin() :void{
   this.loginService.doLogin(this.requestLogin).subscribe((data) =>{
    if(data){
      this.router.navigate(['criar'])}
   },
   (HttpError) =>{
    this.alertService.error(HttpError.error.error
    ,"Falha ao logar");

   }
   );
  }
}

