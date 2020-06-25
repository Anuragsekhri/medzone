import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MedicineModalComponent } from 'app/medicine-modal/medicine-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
class Medicine{
  name : string;
  genericName : string;
  quantity : number;
  hash : string;
}

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})


export class MedicinesComponent implements OnInit {

  constructor(private afs : AngularFirestore , private dialog : MatDialog , private snackbar : MatSnackBar) { }
  alphabets : String[];
  medicines : Medicine[];
  selected : string;
  isClicked = false;
  limit : number = 2; // later change it to 10


  ngOnInit(): void {
    
    this.alphabets = ["A","B","C","D" ,"E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  }

  async select2(a)
  {
    this.limit = 2;
    await this.select(a)
  }

 async select(a)
  {
   
    this.selected = a;
    this.medicines = [];
    await  this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main).doc(this.selected)
    .collection('medicines-'+util.main , ref => ref.limit(this.limit)).get().toPromise().then(
      val => {
        val.forEach( a => {
          const item : any = a.data();
          var o = new Medicine();
          o = item;
          this.medicines.push(o);
        })
      }
    )
    

  }
  add()
  {
    
    this.dialog.open(MedicineModalComponent).afterClosed().toPromise().then(
      val =>{
        console.log("calling again");
        
        if(this.selected != undefined)
        this.select(this.selected);
      }
    );
    
   
    
    
  }

  edit(med )
  {
    var config = new MatDialogConfig();
    config.data = {
      'obj' : med
    }
    this.dialog.open(MedicineModalComponent,config).afterClosed().toPromise().then(
      val=>{
        console.log("calling again");
        
        if(this.selected != undefined)
        this.select(this.selected);

      }
    )

    
  }

  async delete(med , i)
  {
    var string = String( med.name.charAt(0) ).toUpperCase();
    await this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main).doc(string).collection('medicines-'+util.main)
    .doc(med.hash).delete();

    //this.medicines.splice(i,1); its better to reload than saving locally
    this.select(this.selected);

    // elemented delted locally too
  }

  loadmore()
  {
    this.limit = this.limit+10;
    this.select(this.selected);
  }

}
