import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable, of, Subscription} from 'rxjs';
import {AuthenticationService} from './authentication.service';
import {Role} from '../model/role';
import {User} from '../model/user.model';
import {stringify} from 'querystring';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceGuard implements CanActivate {
  private role;
  private user: User;

  constructor(private router: Router, private authService: AuthenticationService) {}

  public getRole() {
    return this.authService.getRole(localStorage.getItem('username'))
  }

  public areUserRolesAllowed(userRoles: string[], allowedUserRole: string): boolean {
    for (const role of userRoles) {
        if (role.toLowerCase() === allowedUserRole.toLowerCase()) {
          return true;
        }
    }
    return false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const roles = route.data['roles'] as Array<string>;
      return this.getRole().pipe(
        map((value => {
          if (this.areUserRolesAllowed(roles, value)) {
            return true;
          }
          this.router.navigate(['/permission']);
          return false;

        }))
      );

  }


}
