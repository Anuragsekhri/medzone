import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { utils } from 'protractor';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-qualificationmodal',
  templateUrl: './qualificationmodal.component.html',
  styleUrls: ['./qualificationmodal.component.css']
})
export class QualificationmodalComponent implements OnInit {

  qual : string;
  hash : string;

  constructor(private afs : AngularFirestore , private dialogref : MatDialogRef<QualificationmodalComponent>,
    private snackbar : MatSnackBar,
  @Inject(MAT_DIALOG_DATA ) data){
    if(data != undefined)
    {
      console.log(data);
      this.hash = data.obj.qualificationHashCode;
      this.qual = data.obj.name;
      console.log(data.obj.name);
      
    }
   }

  ngOnInit(): void {
  }

 async save()
  {
    if(this.qual != undefined && this.qual.length >= 1 && this.hash == undefined)
    {
      var id = this.afs.createId();
      await this.afs.collection(util.main).doc(util.main).collection('qualifications-'+util.main).doc(id).set({
        'name' : this.qual,
        'qualificationHashCode' : id
      })

      this.snackbar.open(" New Qualification Added" , "" , {
        duration : 2000
      })

      this.dialogref.close();

    }

    else if(this.hash != undefined && this.qual != undefined && this.qual.length >= 1)
    {
      await this.afs.collection(util.main).doc(util.main).collection('qualifications-'+util.main).doc(this.hash).update({
        'name' : this.qual,
       
      })
      this.snackbar.open(" Qualification Edited  -- cloud function pending" , "" , {
        duration : 2000
      })

      this.dialogref.close();
    }
  }

}
