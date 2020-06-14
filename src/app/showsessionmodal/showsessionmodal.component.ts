import { Component, OnInit, Inject } from '@angular/core';
import { firestore } from 'firebase';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { data } from 'jquery';

class Session{
  fromTime : firestore.Timestamp;
  toTime : firestore.Timestamp;
  name : string;
  scheduleIdList : string[];
}
@Component({
  selector: 'app-showsessionmodal',
  templateUrl: './showsessionmodal.component.html',
  styleUrls: ['./showsessionmodal.component.css']
})
export class ShowsessionmodalComponent implements OnInit {

  sessions : Session[];
  constructor( @Inject(MAT_DIALOG_DATA) data) {
    this.sessions = [];
    this.sessions = data.obj;
   }

  ngOnInit(): void {
  }

}
