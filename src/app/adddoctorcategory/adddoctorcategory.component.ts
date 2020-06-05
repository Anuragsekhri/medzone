import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';
@Component({
  selector: 'app-adddoctorcategory',
  templateUrl: './adddoctorcategory.component.html',
  styleUrls: ['./adddoctorcategory.component.css']
})
export class AdddoctorcategoryComponent implements OnInit {

  constructor(private afs : AngularFirestore) { }

  added : DoctorCategoryModel[];
  cat : string;

  ngOnInit(): void {
    this.cat = "";

    this.afs.collection(util.main).doc(util.main).collection('doctorCategory-' +util.main).snapshotChanges().subscribe( val => {
      this.added = [];
      val.forEach( a =>
      {
        const item : any = a.payload.doc.data();
        var obj = new DoctorCategoryModel();
        obj = item;
        this.added.push(obj);
      })
    })
  }

  addcategory()
  {
    if(this.cat.length >= 2)
    {
      var id = this.afs.createId();
      this.afs.collection(util.main).doc(util.main).collection('doctorCategory-' +util.main).doc(id).set(
        {
          'dcId' : id,
          'name' : this.cat
        }
        
      )
      this.cat = "";
    }
  }

}
