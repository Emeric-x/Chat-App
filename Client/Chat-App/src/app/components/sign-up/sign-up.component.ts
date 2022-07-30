import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { SHA256, enc } from 'crypto-js';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ErrorMsg: string | undefined

  constructor(private UsersService: UsersService, private Router: Router) { }

  ngOnInit(): void {
  }

  async SignUp(sNewUserFirstname: string, sNewUserLastname: string, sNewUserLogin: string, sNewUserPassword: string, sNewUserAvatar: string){
    if(sNewUserFirstname && sNewUserLastname && sNewUserLogin && sNewUserPassword){
      let hashPassword = SHA256(sNewUserPassword).toString(enc.Hex)

      if(await this.UsersService.LoginAlreadyUsed(sNewUserLogin)){
        this.ErrorMsg = "This login is already used."
      } else {
        const newUser: User = {
          firstname: sNewUserFirstname,
          lastname: sNewUserLastname,
          login: sNewUserLogin,
          password: hashPassword,
          avatar: "ok"
        }
    
        this.UsersService.LoggedUserData = await this.UsersService.SignUpUser(newUser)
    
        if(this.UsersService.LoggedUserData){
          this.UsersService.isAuth = true
          this.Router.navigate(['/GroupsChat'])
        }
      }
    } else {
      this.ErrorMsg = "You must fill all the fields."
    }
  }
}
