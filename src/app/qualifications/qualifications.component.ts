import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { QualificationmodalComponent } from 'app/qualificationmodal/qualificationmodal.component';

class Qualification{
  name : string;
  qualificationHashCode : string;
}

@Component({
  selector: 'app-qualifications',
  templateUrl: './qualifications.component.html',
  styleUrls: ['./qualifications.component.css']
})


export class QualificationsComponent implements OnInit {

  qualifications : Qualification[];
  constructor(private afs  : AngularFirestore , private dialog : MatDialog) { }

  ngOnInit() {

    this.qualifications =[];
    this.afs.collection(util.main).doc(util.main).collection('qualifications-'+util.main).snapshotChanges().subscribe( val => {
      this.qualifications =[];
      val.forEach( a =>{
        const item : any = a.payload.doc.data();
        var obj = new Qualification();
        obj = item;
        this.qualifications.push(obj);
      })
    })
  }

  edit(obj : Qualification)
  {
    var config = new MatDialogConfig();
    config.data = {
      'obj' : obj
    }
    var dialogref = this.dialog.open(QualificationmodalComponent , config);
  }

  addqualification()
  {
    this.dialog.open(QualificationmodalComponent);
  }

}
