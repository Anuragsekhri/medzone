import { Observable } from 'rxjs';

import {tap, take, map} from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, 
        private afAuth : AngularFireAuth,
        private activatedRoute : ActivatedRoute,
        private router: Router) { }

    // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    //     if (!this.authService.isAuthenticated()) {
    //         this.router.navigate(['../auth']);
    //         return false;
    //     } else {
    //         return true;
    //     }
    // }

    canActivate(): Observable<boolean> {
        return this.authService.user$.pipe(
          take(1),
          map(user => user && true),
          tap(isAdmin => {
            if (!isAdmin) {
              // this.toastr.error("Your account has been de-activated. Please contact admin for further information.")
              this.router.navigate(['../auth']);
              this.authService.logout();
            }
          })
        );
       
      }
}
