import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util';
import { Patients } from 'app/Classes/patients';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DoctorInfoModalComponent } from 'app/doctor-info-modal/doctor-info-modal.component';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.css']
})
export class ShowUsersComponent implements OnInit {

  constructor(private afs : AngularFirestore , private route : ActivatedRoute ,private dialog : MatDialog) { }

  users : Patients[];
  temp : Patients[];
  phone : string;
  name : string;
  hash : string;
  gender : string;

 async  ngOnInit() {

    this.route.params.subscribe( val =>{
      var x = val['id'];
      this.hash = x;
      console.log(x);

    })

    if(this.hash != undefined)
    {
      this.users = [];
      this.temp = [];
      await this.afs.collection(util.main).doc(util.main).collection('patients-'+util.main , ref => ref.
      where('linkedDoctorsArray','array-contains',this.hash))
      .get().toPromise().then(
        val => {
          val.forEach( a  => {
            const item : any = a.data();
            var obj = new Patients();
            obj = item;
            this.temp.push(obj);
            this.users.push(obj);
          })
        }
      )
    }
    else{
    this.users =[];
    this.temp =[];
    await this.afs.collection(util.main).doc(util.main).collection('patients-'+util.main).get().toPromise().then(
      val => {
        val.forEach( a  => {
          const item : any = a.data();
          var obj = new Patients();
          obj = item;
          this.temp.push(obj);
          this.users.push(obj);
        })
      }
    )
  }
  }

  applyfilter()
  {
    this.users =[];
    for(let i = 0 ; i < this.temp.length ; i++)
    {
      var add = true;
      if(this.name != undefined && this.name != this.temp[i].name)
      add = false;

      if(this.phone != undefined && this.phone != this.temp[i].phone)
      add = false;

      if(this.gender != undefined && this.gender != this.temp[i].gender)
      add = false;

      if(add)
      this.users.push(this.temp[i]);
    }
  }

  clearfilter()
  {
    this.name = undefined;
    this.phone = undefined;
    this.users = this.temp;
  }

 async info(id)
  {
    var reports = [];
    await this.afs.collection(util.main).doc(util.main).collection('patients-'+util.main).doc(id)
    .collection('reports-'+util.main).get().toPromise().then( val => {
      val.forEach( a =>{
        const item : any = a.data();
        reports.push(item)
      })
    })
    var config = new MatDialogConfig();
    config.data = {
      'obj' : reports
    }
    this.dialog.open(DoctorInfoModalComponent , config);

  }

}
