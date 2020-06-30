import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthInfo } from './AuthInfo';


@Injectable({ providedIn: 'root' })
export class AuthService {


    static context : any;
    user$ : Observable<AuthInfo>;
    username : string;


    private isAuthentcated = new BehaviorSubject<boolean>(false);
    isAuthentcated$ = this.isAuthentcated.asObservable();
    private eventAuthError = new BehaviorSubject<string>('');
    eventAuthError$ = this.eventAuthError.asObservable();

    constructor(
        private afAuth: AngularFireAuth,
        private db: AngularFirestore,
        private router: Router) { 
            AuthService.context = this;
            this.user$ = this.afAuth.authState.pipe(
                (user =>{
                    if(user)
                    {
                        return this.afAuth.idTokenResult
                    }
                    else{
                        return of(null);
                    }
                })
            )
        }


        getcurrentObservable() : any{
            return this.afAuth.authState;
        }

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
                    this.user$ = this.afAuth.idTokenResult;
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
