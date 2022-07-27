import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isAuth: boolean = false
  LoggedUserData: User | undefined

  constructor(private ApiService: ApiService) { }

  SignUpUser(sUser: User): Promise<any>{
    return this.ApiService.SignUpUser(sUser).toPromise()
  }

  SignInUser(sLogin: string, sPassword: string): Promise<any>{
    return this.ApiService.SignInUser(sLogin, sPassword).toPromise()
  }

  GetUserByLogin(sLogin: string): Promise<any>{
    return this.ApiService.GetUserByLogin(sLogin).toPromise()
  }

  GetAllUsers(): Promise<any>{
    return this.ApiService.GetAllUsers().toPromise()
  }

  async LoginAlreadyUser(sLogin: string){
    let AllUsers: any = []
    let result: boolean = false

    AllUsers = await this.GetAllUsers()
    AllUsers.forEach((user: any) => {
      if(user.login === sLogin){
        result = true
      }
    });

    return result
  }
}
