import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SponsormodalComponent } from 'app/sponsormodal/sponsormodal.component';
import { Sponsor } from 'app/Classes/Sponsor';
import { ViewImageModalComponent } from 'app/view-image-modal/view-image-modal.component';

@Component({
  selector: 'app-addsponsor',
  templateUrl: './addsponsor.component.html',
  styleUrls: ['./addsponsor.component.css']
})
export class AddsponsorComponent implements OnInit {

  added : Sponsor[];
  constructor(private afs : AngularFirestore , private dialog : MatDialog) { }

  ngOnInit(): void {
    this.afs.collection(util.main).doc(util.main).collection('sponsors-'+util.main).snapshotChanges().subscribe( val =>{
      this.added =[];
      val.forEach( a => {
        const item : any = a.payload.doc.data();
        var obj = new Sponsor();
        obj = item;
        this.added.push(obj);
      })
    })

  }

  addsponsor()
  {
    console.log("open modal to add the sponsor here");
    this.dialog.open(SponsormodalComponent);
  }

  edit( obj : Sponsor)
  {
    var data = new MatDialogConfig();
    data.data = {
      'obj' : obj
    }
    this.dialog.open(SponsormodalComponent,data);
    console.log("open modal to edit the sponsor here")
  }
  
  openImage(imageUrl : string)
  {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      'imageUrl' : imageUrl
    }
    this.dialog.open(ViewImageModalComponent, dialogConfig);
  }

}
