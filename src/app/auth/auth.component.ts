import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  
  items = []
  S: string = null;
  emails = [];
  isLoading = false;
  authError: any;

  constructor(private authService: AuthService, private afs: AngularFirestore,private router: Router) { }

  ngOnInit() {
    
    this.afs.collection('dev').doc('dev').collection('admin-'+ util.main).snapshotChanges().subscribe(val => {
      this.items = [];
      val.forEach(a => {
        const item: any = a.payload.doc.data();
        item.id = a.payload.doc.id;
        this.items.push(item);
      });
      for (const x of this.items) {

        this.emails.push(x['email']);
      }
      //console.log(this.emails);

    });
    this.authService.eventAuthError$.subscribe( data => {
        this.authError = data;
    });

  }

  onLogin(form: NgForm) {
    this.isLoading = true;

    this.authError = null;
    if (!form.valid) {
      return;
    }
    const password = form.value.password;
    const email = form.value.email;


    if (this.emails.includes(email)) {

      this.authService.login(email, password);

    }
    else{
      console.log("invalid email");
    }
    setTimeout(() =>  {this.isLoading = false}, 2000);
    form.reset();

  }

}
