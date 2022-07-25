import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private UsersService: UsersService, private Router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.UsersService.isAuth) {
        return true
    }
    this.Router.navigate(['/Sign-in'])
    return false
  }
}
