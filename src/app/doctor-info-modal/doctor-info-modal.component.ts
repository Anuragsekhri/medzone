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


  reports : any[]

  constructor( private dialog : MatDialog, private afs : AngularFirestore ,@Inject(MAT_DIALOG_DATA)data) {
    
  this.reports = data.obj;

  }

  ngOnInit() {
       
  }

  goToLink(url: string){
    window.open(url, "_blank");
 }

}
