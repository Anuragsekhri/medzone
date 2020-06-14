import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { utils } from 'protractor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-sponsormodal',
  templateUrl: './sponsormodal.component.html',
  styleUrls: ['./sponsormodal.component.css']
})
export class SponsormodalComponent implements OnInit {

  name : string;
  hash : string;
  constructor(private afs : AngularFirestore , private snackbar : MatSnackBar , private ref : MatDialogRef<SponsormodalComponent>
    , @Inject(MAT_DIALOG_DATA) data) {

      if( data != undefined)
      {
        this.name = data.obj.name;
        this.hash = data.obj.sponsorHashCode;
        console.log(this.name + "" + this.hash);
      }
     }

  ngOnInit(): void {
  }

 async save()
  {
    if(this.name != undefined && this.name.length >= 1 && this.hash == undefined)
    {
    var id = this.afs.createId();
   await this.afs.collection(util.main).doc(util.main).collection('sponsors-'+util.main).doc(id).set(
      {
        'name' : this.name,
        'sponsorHashCode' : id
      })

      
      this.ref.close();
      this.snackbar.open("New Sposnor Added","",{
        duration : 2000
      })
    }
    else if(this.name != undefined && this.name.length >= 1 && this.hash != undefined)
    {
      await this.afs.collection(util.main).doc(util.main).collection('sponsors-'+util.main).doc(this.hash).update(
        {
          'name' : this.name,
         
        })
  
        
        this.ref.close();
        this.snackbar.open(" Sposnor Updated","",{
          duration : 2000
        })
    }

    else{
         this.ref.close();
        this.snackbar.open(" Sposnor Name cant be empty","",{
          duration : 2000
        })

    }
  }
}
