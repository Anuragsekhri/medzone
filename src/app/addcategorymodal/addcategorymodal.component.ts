import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as util from '../util'

@Component({
  selector: 'app-addcategorymodal',
  templateUrl: './addcategorymodal.component.html',
  styleUrls: ['./addcategorymodal.component.css']
})
export class AddcategorymodalComponent implements OnInit {

  cat : string;
  hash : string;
  constructor(private afs : AngularFirestore , private snackbar : MatSnackBar , private ref : MatDialogRef<AddcategorymodalComponent>,
  @Inject(MAT_DIALOG_DATA) data) {
    if(data != undefined)
    {
      this.cat = data.obj.name;
      this.hash = data.obj.categoryId;
    }
   }

  ngOnInit(): void {
  }

 async save()
  {
    if(this.hash == undefined && this.cat != undefined && this.cat.length >= 1)
    {
      var id  = this.afs.createId();
     await this.afs.collection(util.main).doc(util.main).collection('doctorCategory-'+util.main).doc(id)
      .set({
        'categoryId' : id,
        'name' : this.cat
      })

      this.snackbar.open("New Category Added ", "", {
        duration : 2000
      })

      this.ref.close();
    }
    else if(this.hash != undefined && this.cat != undefined && this.cat.length >=1)
    {
    await  this.afs.collection(util.main).doc(util.main).collection('doctorCategory-'+util.main).doc(this.hash).update(
        {
          'name' : this.cat
        }
      )

      
      this.snackbar.open(" Category Updated -- cloud function also left ", "", {
        duration : 2000
      })

      this.ref.close();
    }
    
  }

}
