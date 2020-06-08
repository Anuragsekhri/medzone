import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util';

class User{
  name : string;
  phone : string;
  email : string;
}
@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  constructor(private afs : AngularFirestore) { }

  users : User[];

  ngOnInit(): void {
    this.users =[];

    this.afs.collection(util.main).doc(util.main).collection('patients-'+util.main).snapshotChanges().subscribe(
      val => {
        val.forEach( a  => {
          const item : any = a.payload.doc.data();
          var obj = new User();
          obj = item;
          this.users.push(obj);
        })
      }
    )
  }

}
