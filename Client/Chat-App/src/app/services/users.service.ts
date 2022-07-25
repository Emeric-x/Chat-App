import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  isAuth: boolean = false
  LoggedUserData: User | undefined

  constructor() { }
}
