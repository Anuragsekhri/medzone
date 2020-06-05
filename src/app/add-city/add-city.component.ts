import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore'
import { CityModel } from 'app/Classes/city-model';
import { MatDialog } from '@angular/material/dialog';
import { AddcitymodalComponent } from 'app/addcitymodal/addcitymodal.component';
import * as util from '../util'


@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent implements OnInit {

  constructor(private afs  : AngularFirestore , private dialog : MatDialog) { }

    added : CityModel[];


    addcity()
    {
      this.dialog.open(AddcitymodalComponent);
    }

    ngOnInit() {
      
	 
      this.added =[];

       this.afs.collection(util.main).doc(util.main).collection('cities-' +util.main).snapshotChanges().subscribe( val => {
         this.added = [];
         val.forEach( a =>
         {
           const item : any = a.payload.doc.data();
           var obj = new CityModel();
           obj = item;
           this.added.push(obj);
         })
       })
   
   
       
     
   }

   check(status)
   {
     if(status == 0)
     return true;
     else
     return false;
   }

   call(hash, signal)
   {
     var x = -1;
     if(signal == 0)
     x = 1;
     else
     x = 0;

     this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).doc(hash).update({
       'signal' : x
     })

   }


}
