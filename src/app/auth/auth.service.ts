import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';


@Injectable({ providedIn: 'root' })
export class AuthService {
    private isAuthentcated = new BehaviorSubject<boolean>(false);
    isAuthentcated$ = this.isAuthentcated.asObservable();
    private eventAuthError = new BehaviorSubject<string>('');
    eventAuthError$ = this.eventAuthError.asObservable();
    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router) { }

    getUserState() {

        return this.isAuthentcated;
    }
    login(email: string, password: string) {
        
        this.afAuth.signInWithEmailAndPassword(email, password)
            .catch(error => {
                this.eventAuthError.next(error);

            })
            .then(userCredential => {
                if (userCredential) {
                    this.isAuthentcated.next(true);
                    this.router.navigate(['../dashboard']);

                }
            })

    }
    logout() {
        this.eventAuthError.next('');
        this.isAuthentcated.next(false);
        return this.afAuth.signOut();
    }
    isAuthenticated() {
        let authenticity = true;
        this.isAuthentcated.subscribe(data => {
            authenticity = data; } )
        return authenticity;
    }
}
