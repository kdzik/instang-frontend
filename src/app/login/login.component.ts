import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { RegisterService } from '../services/register.service';
import { LoginService } from '../services/login.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  registerModal: boolean;
  newUser: User = new User();
  registered: boolean = false;

  public model = {'username':'', 'password':''};
  public currentUserName;

  constructor(private regService: RegisterService, private loginService: LoginService, private router: Router) { 
  }

  ngOnInit(): void {
    this.currentUserName = localStorage.getItem("currentUserName");
  }

  onLogin(){
    this.loginService.sendCredential(this.model)
    .subscribe(
      data => {
        localStorage.setItem("token", data);
        this.loginService.sendToken(localStorage.getItem("token"))
        .subscribe(
          res => {
            this.currentUserName = this.model.username;
            localStorage.setItem("currentUserName", this.model.username);
            this.model.username = '';
            this.model.password = '';
            this.router.navigateByUrl('/');
          },
          err => {
            console.log(err);
          }
        )
      },
      err => {
        console.log(err);
      }
    )
  }



  onRegister(){
    console.log("Registration");
    this.regService.sendUser(this.newUser)
    .subscribe(
      data => {
        this.registered = true;
        this.newUser = new User();
      },
      err => {
        console.log(err);
      }
    );
  }

}
