import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CityModel } from 'app/Classes/city-model';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';
import { DoctorModel } from 'app/Classes/doctor-model';
import * as util from '../util';
import { ActivatedRoute } from '@angular/router';
import { Session } from 'app/Classes/session';
import { Schedule } from 'app/Classes/schedule';


class Qualification
{
  name : string;
  qualificationHashCode : string;
  image : File;
  imageUrl : string;
}
@Component({
  selector: 'app-search-by-phone',
  templateUrl: './search-by-phone.component.html',
  styleUrls: ['./search-by-phone.component.css']
})
export class SearchByPhoneComponent implements OnInit {

  doctor : DoctorModel;
  hash : string = "";
  cities : CityModel[];
  sessions : Session[];
  schedules : Schedule[];

  schedulemap : {};

  qualifications : Qualification[];
  categories : DoctorCategoryModel[];

  qual : string[];


  constructor(private afs : AngularFirestore , private route : ActivatedRoute) { }

  map : {};
 
  async ngOnInit() {

    this.route.params.subscribe( val =>{
      var x = val['id'];
      this.hash = x;
      console.log(x);

    })
    console.log(this.hash);
    this.doctor = new DoctorModel();
    this.doctor.city = new CityModel();
    this.doctor.category = new DoctorCategoryModel();
    this.doctor.qualifications =  [];

    await this.afs.collection(util.main).doc(util.main).collection('qualifications-' + util.main).get().toPromise().then(
      val => {
        var index = 0;
        this.qualifications = [];
        // this.map = {};
        val.forEach(a => {
          const item: any = a.data();
          var obj = new Qualification();
          obj = item;
          // this.map[obj.qualificationHashCode] = index;
          // index++;
          this.qualifications.push(obj);
        });
      }
    )

    await  this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).get().toPromise().then(
      val =>{
        this.cities =[];
        val.forEach( a => {
          const item : any = a.data();
          var obj = new CityModel();
          obj = item;
          this.cities.push(obj);
        })
      }
    )

    await  this.afs.collection(util.main).doc(util.main).collection('doctorCategory-'+util.main).get().toPromise().then(
      val =>{
        this.categories =[];
        val.forEach( a => {
          const item : any = a.data();
          var obj = new DoctorCategoryModel();
          obj = item;
          this.categories.push(obj);
        })
      }
    )

    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
    .get().toPromise().then( modal => {
      const item : any = modal;  
      this.doctor = item.data();
      console.log(this.doctor.qualifications);
      this.qual = [];
      for(let i = 0 ; i < this.doctor.qualifications.length ; i++)
      {
        var hash = this.doctor.qualifications[i].qualificationHashCode;
        this.qual.push(hash);
        // console.log(hash + " " + this.map[hash]);
        // this.qualifications[this.map[hash]].imageUrl = this.doctor.qualifications[i].imageUrl;
      }
      
    })

    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
    .collection('schedule-'+util.main).get().toPromise().then( val =>{
      this.schedules = [];
      this.schedulemap = {};
      var index = 0;
      val.forEach( a => {
        const item : any = a.data();
        var obj = new Schedule();
        obj = item;
        obj.sessions = [];
        this.schedules.push(obj);
        this.schedulemap[obj.scheduleId] = index;
        index++;

      })
    })

    console.log(this.schedules);

    //Time - slots 
    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
    .collection('session-'+util.main).get().toPromise().then( val => {
      this.sessions =[];
      val.forEach( a => {
        const item : any = a.data();
        var obj = new Session();
        obj = item;
        this.sessions.push(obj);
        for(let i = 0 ; i < obj.scheduleIdList.length ; i++)
        {
          var index = this.schedulemap[obj.scheduleIdList[i]];
          this.schedules[index].sessions.push(obj);
        }
      })
    })


    

  }


}
