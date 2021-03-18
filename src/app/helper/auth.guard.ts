import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth';

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate {
    constructor (private router: Router, private authenticateService: AuthenticationService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticateService.currentUserValue;

        if (currentUser) {
            return true;
        }

        this.router.navigate(['/'], {queryParams: {returnUrl: state.url}});
        return false;
    }
}