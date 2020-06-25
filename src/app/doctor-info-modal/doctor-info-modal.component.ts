import { Component, Inject, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { firestore } from 'firebase';

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
