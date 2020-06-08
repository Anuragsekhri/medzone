import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddcategorymodalComponent } from 'app/addcategorymodal/addcategorymodal.component';
import { config } from 'rxjs';
@Component({
  selector: 'app-adddoctorcategory',
  templateUrl: './adddoctorcategory.component.html',
  styleUrls: ['./adddoctorcategory.component.css']
})
export class AdddoctorcategoryComponent implements OnInit {

  constructor(private afs : AngularFirestore , private dilaog : MatDialog) { }

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
    this.dilaog.open(AddcategorymodalComponent);
  }

  edit(obj : DoctorCategoryModel)
  {
    var config = new MatDialogConfig();
    config.data ={
      'obj' : obj
    }
    this.dilaog.open(AddcategorymodalComponent, config);
  }

}
