import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CityModel } from 'app/Classes/city-model';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';
import { DoctorModel } from 'app/Classes/doctor-model';
import { Experience } from 'app/Classes/Experience';
import { GroupSlot } from 'app/Classes/GroupSlot';
import { Schedule } from 'app/Classes/schedule';
import { Session } from 'app/Classes/session';
import { SingleSlot } from 'app/Classes/single-slot';
import { Slot } from 'app/Classes/slot';
import { Sponsor } from 'app/Classes/Sponsor';
import { ViewImageModalComponent } from 'app/view-image-modal/view-image-modal.component';
import * as util from '../util';



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
  sponsors : Sponsor[];

  previous_sponsors : Sponsor[];

  current_Sponsor : Sponsor;

  date : Date;

  groupSlot : GroupSlot[];
  single_slot : SingleSlot[];

  schedulemap : {};

  sponsorMap : {};

  qualifications : Qualification[];
  categories : DoctorCategoryModel[];

  experiences_final : any[];

  qual : Qualification[];
  slots : Slot[];
  check : boolean = false;

  cityMap : {};
  categoryMap : {};
  


  constructor(private afs : AngularFirestore , private route : ActivatedRoute , private dialog : MatDialog ,
     private staorage : AngularFireStorage
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

    await this.afs.collection(util.main).doc(util.main).collection('qualifications-' + util.main).get().toPromise().then(val => {
        var index = 0;
        this.qualifications = [];
        this.map = {};
        val.forEach(a => {
          const item: any = a.data();
          var obj = new Qualification();
          obj = item;
          this.map[obj.qualificationHashCode] = obj;
          this.qualifications.push(obj);
        });
      }
    )

    await  this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).get().toPromise().then( val =>{
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

    await  this.afs.collection(util.main).doc(util.main).collection('doctorCategory-'+util.main).get().toPromise().then(val =>{
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

    await this.afs.collection(util.main).doc(util.main).collection('sponsors-'+util.main).get().toPromise().then( val =>{
      this.sponsors =[];
      this.sponsorMap = {};
      val.forEach( a =>{
        const item : any = a.data();
        var obj = new Sponsor();
        obj = item;
        this.sponsors.push(obj);
        this.sponsorMap[obj.sponsorHashCode] = obj;
      })
    })

    // list of his previous sponsors
     this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash).collection('sponsors-'+util.main)
    .snapshotChanges().subscribe( val =>{
      this.previous_sponsors =[];
      val.forEach( a => {
        const item : any = a.payload.doc.data();
        var obj = new Sponsor();
        obj = item['sponsor'];
        obj.sponsorStartDateo = obj.sponsorStartDate.toDate();
        obj.sponsorEndDateo = obj.sponsorEndDate.toDate();
        this.previous_sponsors.push(obj);
      })

      //console.log("previous_sponsors" , this.previous_sponsors);
      

    })

   

    this.afs.collection(util.main).doc(util.main).collection('doctors-' + util.main).doc(this.hash)
      .snapshotChanges().subscribe(modal  => {
        const item: any = modal.payload.data();
        this.doctor = item;
        this.current = item;
        //console.log(this.doctor);
        this.current_Sponsor = new Sponsor(); // it stores the changes 
        this.current_Sponsor = this.sponsorMap[this.doctor.currentSponsor.sponsorHashCode];
        this.current_Sponsor.sponsorStartDateo = this.doctor.currentSponsor.sponsorStartDate.toDate();
        this.current_Sponsor.sponsorEndDateo = this.doctor.currentSponsor.sponsorEndDate.toDate();
        //console.log("hjkl", this.current_Sponsor);

        console.log(this.doctor.qualifications);
        this.qual = [];
        this.check = true;

        for (let i = 0; i < this.doctor.qualifications.length; i++) {
          var hash = this.doctor.qualifications[i].qualificationHashCode;
          console.log(this.map[hash]);

          this.map[hash].imageUrl = this.doctor.qualifications[i].imageUrl;
          this.qual.push(this.map[hash]);

        }

        for (let i = 0; i < this.doctor.workExperience.length; i++) {
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

    for(let i = 0 ; i < this.doctor.workExperience.length ; i++)
    {
      var oo = this.doctor.workExperience[i];
      if(oo.name == undefined || oo.startDateo == undefined || oo.endDateo == undefined)
      {
        this.snackbar.open("ALL fields (except Date) are required to updat the experience","",{
          duration : 2000
        })

        return;
      }
    }

    this.experiences_final = [];
    for(let i = 0 ; i < this.doctor.workExperience.length ; i++)
    {
      var obj = this.doctor.workExperience[i];
      if(obj.certificate == undefined  )
      {
        // no image added , changed
        if(obj.imageUrl == undefined)
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


 async update_qualifications()
  {
    await this.upload3();
    console.log(this.qual);

    var qualfinal = [];
    for(let i = 0 ; i < this.qual.length ; i++)
    {
      var o = {};
      o['imageUrl'] = this.qual[i].imageUrl;
      o['name'] = this.qual[i].name;
      o['qualificationHashCode'] = this.qual[i].qualificationHashCode;

      qualfinal.push(o);
    }
    
    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
    .update({
      'qualifications' : qualfinal
    })

    this.snackbar.open("Qulaification Updated ", "", {
      duration : 2000
    })
  }

  upload_qualification(event , i)
  {
    
    var file = event.target.files[0];
    this.qualifications[i].image = file;
  }

  async upload3()
  {
    for(let i = 0 ; i < this.qual.length ; i++)
    {
      var obj = this.qual[i];
      if(obj.image == undefined  )
      {
        // no image added , changed
        if(obj.imageUrl == undefined )
        {
         this.qual[i].imageUrl = "";
        
        }

         
      }
      else
      {
        
           // new experience to be added with the image or previous image chnaged
          
           const file = obj.image;
           const filename = obj.image.name;
           const filepath = "doctors/"+ this.hash +"/qualifications/"+filename;
           const fileRef = this.staorage.ref(filepath);
           const uploadTask = this.staorage.upload(filepath,file);
     
          await uploadTask.snapshotChanges().pipe().toPromise().then (  () =>{
             return fileRef.getDownloadURL().toPromise().then( result => {
               console.log(result);
               this.qual[i].imageUrl =  result;
               //o['imageUrl'] = result;
             })
           })
         

           
         
      }
    }
  }

  openImage(imageUrl : string)
  {
    var dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      'imageUrl' : imageUrl
    }
    this.dialog.open(ViewImageModalComponent, dialogConfig);
  }


  async update_current_sponsor()
  {
    console.log(this.current_Sponsor);
    console.log(this.current.currentSponsor);

    if(this.current_Sponsor.sponsorStartDateo == undefined || this.current_Sponsor.sponsorEndDateo == undefined)
    {
      this.snackbar.open("Enter start and End Details also to update the Sponsor", "",{
        duration : 2000
      })
      return;
    }
    
    if(this.current_Sponsor.sponsorHashCode == this.current.currentSponsor.sponsorHashCode)
    {
      // changes in date of current sponosor
      var obj = {};
      obj['name'] = this.current_Sponsor.name;
      obj['sponsorStartDate'] = this.current_Sponsor.sponsorStartDateo;
      obj['sponsorHashCode'] = this.current_Sponsor.sponsorHashCode;
      obj['sponsorEndDate'] = this.current_Sponsor.sponsorEndDateo;

      

      await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
      .update({
        'currentSponsor' : obj
      })
      console.log("current sponosor updated");
      this.snackbar.open("Current Sponsor Updated","",{
        duration: 2000
      })
      
    }
    else{

      var obj = {};
      obj['name'] = this.current_Sponsor.name;
      obj['sponsorStartDate'] = this.current_Sponsor.sponsorStartDateo;
      obj['sponsorHashCode'] = this.current_Sponsor.sponsorHashCode;
      obj['sponsorEndDate'] = this.current_Sponsor.sponsorEndDateo;

     
      // local change
      
      var obj2 = {};
      var id = this.afs.createId();
      obj2['name'] = this.doctor.currentSponsor.name;
      obj2['sponsorStartDate'] = this.current.currentSponsor.sponsorStartDate;
      obj2['sponsorHashCode'] = this.current.currentSponsor.sponsorHashCode;
      obj2['sponsorEndDate'] = this.current.currentSponsor.sponsorEndDate;
      obj2['docId'] = id;

      await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash).collection('sponsors-'+util.main).doc(id)
      .set({
        'sponsor' : obj2
      })
      console.log("previoud moved ", obj2);

      await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash)
      .update({
        'currentSponsor' : obj
      })
      console.log("current sponosor updated" , obj);

      this.snackbar.open("Current Sponsor Updated","",{
        duration: 2000
      })


    }
    
  }

  async delete_sponsor(obj )
  {
    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash).collection('sponsors-'+util.main)
    .doc(obj.docId).delete();

    console.log("deleted");
    this.snackbar.open(" Sponsor Deleted","",{
      duration: 2000
    })
    
  }

  async update_previous_sponsor(obj)
  {
    var obj2 = {};
    
    obj2['name'] = this.sponsorMap[obj.sponsorHashCode].name;
    obj2['sponsorStartDate'] = obj.sponsorStartDateo;
    obj2['sponsorHashCode'] = obj.sponsorHashCode;
    obj2['sponsorEndDate'] = obj.sponsorEndDateo
    obj2['docId'] = obj.docId;

    await this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(this.hash).collection('sponsors-'+util.main)
    .doc(obj.docId).update({
      'sponsor' : obj2
    })

    console.log("updated");
    this.snackbar.open(" Sponsor Updated","",{
      duration: 2000
    })
    

  }


}
