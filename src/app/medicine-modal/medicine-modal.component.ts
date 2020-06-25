import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import * as util from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';
class Medicine{
  name : string;
  genericName : string;
  quantity : number;
  hash : string;
}
@Component({
  selector: 'app-medicine-modal',
  templateUrl: './medicine-modal.component.html',
  styleUrls: ['./medicine-modal.component.css']
})
export class MedicineModalComponent implements OnInit {

  med : Medicine;
  recieved : Medicine;
  earlier : string;
  constructor(private afs : AngularFirestore , private snackbar : MatSnackBar ,
    private dialoagref : MatDialogRef<MedicineModalComponent>, @Inject(MAT_DIALOG_DATA) data) {

    if(data != undefined)
    {
      console.log("edit " + data.obj);
      this.med = new Medicine();
      this.med = data.obj;
      this.recieved = data.obj;
      console.log(this.med);
      this.earlier = (this.med.name.charAt(0)).toUpperCase();
      
    }
  }

  ngOnInit(): void {
    if(this.med == undefined)
    this.med = new Medicine();
  }
 async save()
  {
    // checks needed

    if(this.med.name == undefined || this.med.name.length <= 1 || this.med.genericName == undefined || this.med.genericName.length <= 1 || this.med.quantity == undefined)
    {
      this.snackbar.open("All fields are required ","",{
        duration: 2000
      })
    }
    else
    {
    if(this.med.hash == undefined)
    {
    var string = String( this.med.name.charAt(0) ).toUpperCase();
    console.log(string , this.med);
    var id = this.afs.createId();
    await  this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main)
    .doc(string).collection('medicines-'+util.main).doc(id).set(
      
      {
        'name' : this.med['name'],
        'genericName' : this.med['genericName'],
        'quantity' : this.med['quantity'],
        'hash' : id
      }
    )
    this.dialoagref.close();
    this.snackbar.open("New Medicine Added Successfully ", "", {
      duration : 2000
    })
    }
    else{
    console.log(this.med.hash);
     
    // deleting the pervious documnet as there might be case when the first char is also diff
    // so the collection will also be different
    await this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main)
    .doc(this.earlier).collection('medicines-'+util.main).doc(this.med.hash).delete();
   
    var id = this.afs.createId();
    var string = String( this.med.name.charAt(0) ).toUpperCase();
    await  this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main)
    .doc(string).collection('medicines-'+util.main).doc(id).set(
      
      {
        'name' : this.med['name'],
        'genericName' : this.med['genericName'],
        'quantity' : this.med['quantity'],
        'hash' : id
      }
    )

    this.dialoagref.close();
    this.snackbar.open("Medicine Edited", "",{
      duration : 2000
    })

    }
   }

  }

  

}
