import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  ErrorLoginAlreadyUsed: string | undefined

  constructor(private UsersService: UsersService, private Router: Router) { }

  ngOnInit(): void {
  }

  async SignUp(sNewUserFirstname: string, sNewUserLastname: string, sNewUserLogin: string, sNewUserPassword: string){
    if(!this.UsersService.LoginAlreadyUser(sNewUserLogin)){
      const newUser: User = {
        firstname: sNewUserFirstname,
        lastname: sNewUserLastname,
        login: sNewUserLogin,
        password: sNewUserPassword,
        avatar: "ok"
      }
  
      this.UsersService.LoggedUserData = await this.UsersService.SignUpUser(newUser)
  
      if(this.UsersService.LoggedUserData){
        this.UsersService.isAuth = true
        this.Router.navigate(['/GroupsChat'])
      }
    } else {
      this.ErrorLoginAlreadyUsed = "This login is already used."
    }
  }
}
