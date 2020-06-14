import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DoctorModel } from 'app/Classes/doctor-model';
import { Experience } from 'app/Classes/Experience';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { ShowsessionmodalComponent } from 'app/showsessionmodal/showsessionmodal.component';

class Session{
  fromTime : firestore.Timestamp;
  toTime : firestore.Timestamp;
  name : string;
  scheduleIdList : string[];
}

class Schedule{
  name : string;
  scheduleId : string;
  sessions : Session[];
}
@Component({
  selector: 'app-doctor-info-modal',
  templateUrl: './doctor-info-modal.component.html',
  styleUrls: ['./doctor-info-modal.component.css']
})
export class DoctorInfoModalComponent implements OnInit {

 
  obj : DoctorModel
  quallist : string;
  experiences : Experience[];

  map : {};

  sessions : Session[];

  schedules : Schedule[];

  constructor( private dialog : MatDialog, private afs : AngularFirestore ,@Inject(MAT_DIALOG_DATA)data) {

    //console.log(data.obj);
    
    this.obj = data.obj;
    this.experiences = [];
    this.experiences = this.obj.workExperience
   }

  async ngOnInit() {
    
    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.obj.doctorId)
    .collection('schedule-'+util.main).get().toPromise().then(
      val => {
        this.schedules =[];
        this.map = {};
        var index  = 0
        val.forEach( a => {
          const item : any = a.data();
          var obj = new Schedule();
          obj = item;
          obj.sessions =[];
          this.map[obj.scheduleId] = index;
          index++;
          this.schedules.push(obj)
        })
      }
    )

    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.obj.doctorId)
    .collection('session-'+util.main).get().toPromise().then(
      val =>{
        
        val.forEach( a=>{
          const item : any = a.data();
          var obj = new Session();
          obj = item;
          for(let i = 0 ; i < obj.scheduleIdList.length ; i++)
          {
            this.schedules[ this.map[ obj.scheduleIdList[i] ]].sessions.push(obj);
          }
        })
      }
    )

    console.log(this.schedules);


    this.quallist = "";
    for(let i = 0 ; i < this.obj.qualifications.length ; i++)
    {
      this.quallist = this.quallist + this.obj.qualifications[i].name + " , "
    }

    this.experiences =[];
    this.experiences = this.obj.workExperience;

    console.log(this.experiences);

   
  }

  open(obj : Schedule)
  {
    console.log("called");
    var config = new MatDialogConfig();
    config.data = {
      'obj' : obj.sessions
    }
    this.dialog.open(ShowsessionmodalComponent, config);
    console.log(obj.sessions);
  }

}
