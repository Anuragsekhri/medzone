import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DoctorModel } from 'app/Classes/doctor-model';
import * as util from '../util';
import { MatDateFormats } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adddrlist',
  templateUrl: './adddrlist.component.html',
  styleUrls: ['./adddrlist.component.css']
})
export class AdddrlistComponent implements OnInit {

  constructor(private afs : AngularFirestore , private dialog : MatDialog , private snackbar : MatSnackBar) { }

  doctors : DoctorModel[];
  temp : DoctorModel[];
  phone: string;
  name : string;

  ngOnInit(): void {
    this.doctors = [];

    this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).snapshotChanges().subscribe(
      val => {
        this.doctors =[];
        this.temp =[];
        val.forEach( a=> {
          const item : any = a.payload.doc.data();
          var obj = new DoctorModel();
          obj = item;
          this.doctors.push(obj);
          this.temp.push(obj);
        })

        this.applyfilter();
      }
      
    )
  }

  applyfilter()
  {
    this.doctors =[];
    for(let i = 0 ; i < this.temp.length ; i++)
    {
      var add = true;

      if(this.name != undefined && this.temp[i].name !=  this.name)
      add = false;

      if(this.phone != undefined && this.temp[i].mobile != this.phone)
      add = false;

      if(add)
      this.doctors.push(this.temp[i]);

    }
  }

  clearfilter()
  {
    this.name = undefined;
    this.phone = undefined;

    this.doctors = this.temp;
  }

  openmodal()
  {
    this.dialog.open(UserProfileComponent);
  }

  call(hash, status)
  {
    if(status == true)
    status = false;
    else
    status = true;

    this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(hash).update(
      {
        'active' : status
      }

    )
    if(status)
    {
      this.snackbar.open("Doctor status set to active","",{
        duration:2000
      })
    }
    else{
      this.snackbar.open("Doctor status set to De-Active","",{
        duration:2000
      })
    }
  }

}
