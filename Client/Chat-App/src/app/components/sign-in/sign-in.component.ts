import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { SHA256, enc } from 'crypto-js';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  ErrorMsg: string | undefined
  
  constructor(private UsersService: UsersService, private Router: Router) { }

  ngOnInit(): void {
  }

  async SignIn(sUserLogin: string, sUserPassword: string){
    if(sUserLogin && sUserPassword){
      let hashedPassword = SHA256(sUserPassword).toString(enc.Hex)
      this.UsersService.LoggedUserData = await this.UsersService.SignInUser(sUserLogin, hashedPassword)
      
      if(this.UsersService.LoggedUserData){
        this.UsersService.isAuth = true
        this.Router.navigate(['/GroupsChat'])
      } else {
        this.ErrorMsg = "Login or password incorrect."
      }
    } else {
      this.ErrorMsg = "You must fill all the fields."
    }
  }
}
