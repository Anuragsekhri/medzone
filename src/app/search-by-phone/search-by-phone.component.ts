import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { CityModel } from 'app/Classes/city-model';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';
import { DoctorModel } from 'app/Classes/doctor-model';
import { Schedule } from 'app/Classes/schedule';
import { Session } from 'app/Classes/session';
import * as util from '../util';
import { firestore } from 'firebase';
import { Slot } from 'app/Classes/slot';
import { GroupSlot } from 'app/Classes/GroupSlot';
import { SingleSlot } from 'app/Classes/single-slot';
import { Experience } from 'app/Classes/Experience';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { threadId } from 'worker_threads';



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
  styleUrls: ['./search-by-phone.component.css', ]
})
export class SearchByPhoneComponent implements OnInit {

  doctor : DoctorModel;
  current : DoctorModel;
  hash : string = "";
  cities : CityModel[];
  sessions : Session[];
  schedules : Schedule[];

  date : Date;

  groupSlot : GroupSlot[];
  single_slot : SingleSlot[];

  schedulemap : {};

  qualifications : Qualification[];
  categories : DoctorCategoryModel[];

  experiences_final : any[];

  qual : string[];
  slots : Slot[];

  cityMap : {};
  categoryMap : {};
  


  constructor(private afs : AngularFirestore , private route : ActivatedRoute , private staorage : AngularFireStorage
    , private snackbar : MatSnackBar) { }

  map : {};
 
  async ngOnInit() {

    this.route.params.subscribe( val =>{
      var x = val['id'];
      this.hash = x;
      console.log(x);

    })
    console.log(this.hash);
    this.doctor = new DoctorModel();
    this.current = new DoctorModel();

    this.current.city = new CityModel();
    this.current.category = new DoctorCategoryModel();
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
        this.cityMap = {};
        val.forEach( a => {
          const item : any = a.data();
          var obj = new CityModel();
          obj = item;
          this.cityMap[obj.cityId] = obj.cityName;
          this.cities.push(obj);
        })
      }
    )

    await  this.afs.collection(util.main).doc(util.main).collection('doctorCategory-'+util.main).get().toPromise().then(
      val =>{
        this.categories =[];
        this.categoryMap = {};
        val.forEach( a => {
          const item : any = a.data();
          var obj = new DoctorCategoryModel();
          obj = item;
          this.categoryMap[obj.categoryId] = obj.name;
          this.categories.push(obj);
        })
      }
    )

   

    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
    .get().toPromise().then( modal => {
      const item : any = modal;  
      this.doctor = item.data();
      this.current = item.data();
      console.log(this.doctor);
      
      console.log(this.doctor.qualifications);
      this.qual = [];
      for(let i = 0 ; i < this.doctor.qualifications.length ; i++)
      {
        var hash = this.doctor.qualifications[i].qualificationHashCode;
        this.qual.push(hash);
        // console.log(hash + " " + this.map[hash]);
        // this.qualifications[this.map[hash]].imageUrl = this.doctor.qualifications[i].imageUrl;
      }

      for(let i = 0 ; i < this.doctor.workExperience.length ; i++)
      {
        this.doctor.workExperience[i].startDateo = this.doctor.workExperience[i].startDate.toDate();
        this.doctor.workExperience[i].endDateo = this.doctor.workExperience[i].endDate.toDate();
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
      console.log(this.schedules);
    })

    

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

  call()
  {
    var doc = "";
    var m = this.date.getMonth() + 1;
    if(m < 10)
    {
      doc = this.date.getFullYear() + "0"+ m;
    }
    else
    { doc = this.date.getFullYear() + ""+m
    }
    console.log(doc);
   
    
    
    let toTime = new Date(this.date.getUTCFullYear() , this.date.getMonth(), this.date.getDate());
    toTime.setHours(23,59,59);

    console.log(toTime);
    
    this.date.setHours(0,0,0);
   

    console.log(this.date + " " + toTime);
    
    this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
    .collection('monthlySlot-'+util.main).doc(doc).collection('slot-'+util.main, ref => ref.where
    ('fromTime','>=',this.date).where('fromTime','<=',toTime)).get().toPromise().then(
      val => {
        this.slots =[];
        val.forEach( a => {
          const item : any = a.data();
          var obj = new Slot();
          obj = item;
          console.log(obj);
          this.slots.push(obj);
        })
        this.call2();
      }
    )
  }

  call2()
  {
    this.groupSlot = [];
    for(let i = 0 ; i < this.slots.length ; i++)
    {
      var keys = Object.keys( this.slots[i].groupSlotsMap);
      //console.log(keys);
      
      for( let j = 0 ; j < keys.length ; j++)
      {
        var obj = new GroupSlot();
        obj = this.slots[i].groupSlotsMap[keys[j]];
        this.groupSlot.push(obj);
      }
    }

    this.single_slot = [];
    for(let ii = 0 ; ii < this.slots.length ; ii++)
    {
      var keys2 = Object.keys( this.slots[ii].singleSlotsMap);
      console.log(keys2);
      
      for(let k = 0 ; k < keys2.length ; k++)
      {
        var obj2 = new SingleSlot();
        obj2 = this.slots[ii].singleSlotsMap[keys2[k]];
        if(obj2.appointmentId.length <= 1)
        {
          obj2.appointmentId = "NO APPOINTMENT YET"
        }
        this.single_slot.push(obj2);
      }

    }
    console.log(this.single_slot);
    

  }

  add()
  {
    this.doctor.workExperience.push(new Experience());
  }

  remove(i){
    this.doctor.workExperience.splice(i,1);
  }

async  update_experience()
  {
    // check everything ok 
    this.experiences_final = [];
    for(let i = 0 ; i < this.doctor.workExperience.length ; i++)
    {
      var obj = this.doctor.workExperience[i];
      if(obj.certificate == undefined  )
      {
        // no image added , changed
        if(obj.imageUrl.length == undefined)
        {
          var o = {};
          o['name'] = obj.name;
          o['startDate'] = obj.startDateo;
          o['endDate'] = obj.endDateo;
          o['imageUrl'] = "";
         // new experience added with no image
         this.experiences_final.push(o);
        }
        else{
          // it was previoud object with no changes in image 
            var o = {};
            o['name'] = obj.name;
            o['startDate'] = obj.startDateo
            o['endDate'] = obj.endDateo
            o['imageUrl'] = obj.imageUrl

            this.experiences_final.push(o);
        }
      }
      else
      {
        
           // new experience to be added with the image or previous image chnaged
           var o = {};
           const file = obj.certificate;
           const filename = obj.certificate.name;
           const filepath = "doctors/"+ this.hash +"/experiences/"+filename;
           const fileRef = this.staorage.ref(filepath);
           const uploadTask = this.staorage.upload(filepath,file);
     
          await uploadTask.snapshotChanges().pipe().toPromise().then (  () =>{
             return fileRef.getDownloadURL().toPromise().then( result => {
               console.log(result);
               o['imageUrl'] = result;
             })
           })
          o['name'] = obj.name;
          o['startDate'] = obj.startDateo;
          o['endDate'] = obj.endDateo;

           this.experiences_final.push(o);
         
      }

    }

    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main)
    .doc(this.hash).update({
      'workExperience' : this.experiences_final
    })

   this.snackbar.open("Work Experience Added ", "",{
     duration : 2000
   })
    
  }

  upload2(event , i)
  {
    this.doctor.workExperience[i].certificate = event.target.files[0];
  }


  // uploadd(event)
  // {
  //   // chnage doctor image here
  // }

  async  update_personal_info()
  {
    if(this.doctor.fname == undefined || this.doctor.lname == undefined || this.doctor.inPersonFee == undefined || this.doctor.throughVideoFee == undefined
    || this.doctor.fname.length <= 1 || this.doctor.inPersonFee < 0 || this.doctor.throughVideoFee <0)
    {
      this.snackbar.open("Enter valid details to update the Fields ","",{
        duration : 2000
      })
      this.doctor.fname = this.current.fname;
      this.doctor.lname = this.current.lname;
      this.doctor.inPersonFee = this.current.inPersonFee;
      this.doctor.throughVideoFee = this.current.throughVideoFee;
    }
    else{

      var obj = {};
      obj['cityId'] = this.doctor.city.cityId;
      obj['cityName'] = this.cityMap[this.doctor.city.cityId];

      var obj2 = {};
      obj2['categoryId'] = this.doctor.category.categoryId;
      obj2['name'] = this.categoryMap[this.doctor.category.categoryId];

      await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.doctor.doctorId)
      .update({
        'fname' : this.doctor.fname,
        'lname' : this.doctor.lname,
        'inPersonFee' : this.doctor.inPersonFee,
        'throughVideoFee' : this.doctor.throughVideoFee,
        'gender' : this.doctor.gender,
        'salutation' : this.doctor.salutation,
        'city' : obj,
        'category' : obj2,
      })

      this.snackbar.open("Details Updated ", "", {
        duration : 2000
      })

    }
  }


}
