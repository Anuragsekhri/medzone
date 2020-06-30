import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util';
import { CityModel } from 'app/Classes/city-model';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';

class Obj{
  categoryname:  string;
  count : string;

  Obj(categoryname : string , count : string)
  {
    this.categoryname = categoryname;
    this.count = count;
  }
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  catmap : {};
  citymap : {};

  cities : CityModel[];
  categories : DoctorCategoryModel[];
  monthly : boolean = true;

  stats : string ="Monthly";

  categoryAppointment : Obj[];
  categoryDoctor : Obj[];

  cityId : string;
  date : Date;

  constructor(private afs : AngularFirestore) { }

  ngOnInit() {
    this.monthly = true;
     
      this.afs.collection(util.main).doc(util.main).collection('doctorCategory-'+util.main).get().toPromise().then(
        val =>{
          this.catmap = {};
         
          val.forEach( a =>{
            const item : any = a.data();
            this.catmap[item['categoryId']] = item['name'];
          })
          console.log(this.catmap);
          
        }
      )

      this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).get().toPromise().then(
        val =>{
          this.citymap = {};
          this.cities =[];
          val.forEach( a =>{
            const item : any = a.data();
            var obj = new CityModel();
            obj = item;
            this.cities.push(obj);
            this.citymap[item['cityId']] = item['cityName'];
          })
          console.log(this.citymap);
          
        }
      )

    
      
 
  }

  change()
  {
    if(this.monthly == true)
    this.stats = "Monthly Stats"
    else
    this.stats = "Daily Stats"
  }



  async apply(){

    console.log(this.monthly);
    
    
    if(this.monthly == true)
    {
      // monthly stats
      this.categoryAppointment  = [];
      this.categoryDoctor = [];
      var str  = "";

      if(this.date.getMonth() + 1 < 10)
      str = this.date.getUTCFullYear() + '0' + (this.date.getMonth() + 1)
      else
      str = this.date.getUTCFullYear() + '0' + (this.date.getMonth() + 1)
      

      console.log(str);
      
      
      await this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).doc(this.cityId).
      collection('cityStats-'+util.main)
      .doc(str).get().toPromise()
      .then( a => {
        const modal : any = a.data();
        this.categoryAppointment =[];
        this.categoryDoctor =[];

        var categoryAppointment  = modal.categoryAppointment;
        var categoryDoctor  = modal.categoryDoctor;

        if(categoryAppointment != undefined)
        {
        var keys = Object.keys(  modal['categoryAppointment'] );
        this.categoryAppointment = [];
        for(let i = 0 ; i < keys.length ; i++)
        {
          var obj = new Obj();
          obj.categoryname = this.catmap[keys[i]];
          obj.count = categoryAppointment[keys[i]];
          this.categoryAppointment.push(obj);
        }
        }

        if(categoryDoctor != undefined)
        {
        var keys2 =  Object.keys( modal['categoryDoctor'] );
        this.categoryDoctor = [];
        
        for(let i = 0 ; i < keys2.length ; i++)
        {
          var obj = new Obj();
          obj.categoryname = this.catmap[keys2[i]];
          obj.count = categoryDoctor[keys2[i]];
          this.categoryDoctor.push(obj);
        }
        }
        

        

        
        
      })
    }
    else{
      // daily stats

      var m = "";
      var str = ""+ this.date.getUTCFullYear();
      if(this.date.getMonth() +1 < 10)
      {
        str =str + '0'+ (this.date.getUTCMonth() + 1);
      }
      else{
        str = str +  (this.date.getUTCMonth() + 1);
      }
      m = str;

      if(this.date.getDate() < 10)
      str = str +'0' + this.date.getDate();
      else
      str = str + this.date.getDate();

      console.log(str , m);
      await this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).doc(this.cityId).
      collection('cityStats-'+util.main).doc(m).collection('cityDailyStats-'+util.main)
      .doc(str).get().toPromise()
      .then( a => {
        const modal : any = a.data();
        console.log(modal);
        
        this.categoryAppointment =[];
        this.categoryDoctor =[];

        var categoryAppointment  = modal.categoryAppointment;
        var categoryDoctor  = modal.categoryDoctor;

        if(categoryAppointment != undefined)
        {
        var keys = Object.keys(  modal['categoryAppointment'] );
        this.categoryAppointment = [];
        for(let i = 0 ; i < keys.length ; i++)
        {
          var obj = new Obj();
          obj.categoryname = this.catmap[keys[i]];
          obj.count = categoryAppointment[keys[i]];
          this.categoryAppointment.push(obj);
        }
        }

        if(categoryDoctor != undefined)
        {
        var keys2 =  Object.keys( modal['categoryDoctor'] );
        this.categoryDoctor = [];
        
        for(let i = 0 ; i < keys2.length ; i++)
        {
          var obj = new Obj();
          obj.categoryname = this.catmap[keys2[i]];
          obj.count = categoryDoctor[keys2[i]];
          this.categoryDoctor.push(obj);
        }
        }
2
        
        
      })
      
    }

  }

  

}
