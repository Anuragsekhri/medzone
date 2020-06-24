import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CityModel } from 'app/Classes/city-model';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';
import { DoctorModel } from 'app/Classes/doctor-model';
import { Sponsor } from 'app/Classes/Sponsor';
import { UserProfileComponent } from 'app/user-profile/user-profile.component';
import * as util from '../util';
import { ShowUsersComponent } from 'app/show-users/show-users.component';



@Component({
  selector: 'app-adddrlist',
  templateUrl: './adddrlist.component.html',
  styleUrls: ['./adddrlist.component.css']
})
export class AdddrlistComponent implements OnInit {

  constructor(private afs: AngularFirestore, private dialog: MatDialog, private snackbar: MatSnackBar
    , private router : Router , private route: ActivatedRoute ) { }

  doctors: DoctorModel[];
  temp: DoctorModel[];
  phone: string;
  name: string;

  pass : string;

  categoryHashCode: string;
  cityHashCode: string;

  cities: CityModel[];
  categories: DoctorCategoryModel[];

  sponosrs : Sponsor[];

  sponsorHashCode : string;


  async ngOnInit() {

    
    // var a  = Number("9779171298")
    // var id = a.toString(32);
    // console.log(id);

    this.doctors = [];

    await this.afs.collection(util.main).doc(util.main).collection('doctorCategory-' + util.main).get().toPromise()
      .then(val => {
        this.categories = [];
        val.forEach(a => {
          const item: any = a.data();
          var obj = new DoctorCategoryModel();
          obj = item;
          this.categories.push(obj);
        })

      })

    await this.afs.collection(util.main).doc(util.main).collection('cities-' + util.main).get().toPromise()
      .then(val => {
        this.cities = [];
        val.forEach(a => {
          const item: any = a.data();
          var obj = new CityModel();
          obj = item;
          this.cities.push(obj);
        })

      })

    this.afs.collection(util.main).doc(util.main).collection('sponsors-'+util.main).snapshotChanges().subscribe(
      val => {
        this.sponosrs =[];
        this.temp =[];
        val.forEach( a=> {
          const item : any = a.payload.doc.data();
          var obj = new Sponsor();
          obj = item;
          this.sponosrs.push(obj);
        })

        //this.applyfilter();
      }

    )
  }

 

  clearfilter() {
    this.name = undefined;
    this.phone = undefined;
    this.categoryHashCode = undefined;
    this.cityHashCode = undefined;
    this.doctors = this.temp;
  }

  openmodal() {
    this.dialog.open(UserProfileComponent);
  }

  call(i, hash, status) {
    if (status == true)
      status = false;
    else
      status = true;

    this.afs.collection(util.main).doc(util.main).collection('doctors-' + util.main).doc(hash).update({'active': status}
    
    
    ).then( (value)=>{
      this.doctors[i].active = status;
      if (status) {
        this.snackbar.open("Doctor status set to active", "", {
          duration: 2000
        })
      }
      else {
        this.snackbar.open("Doctor status set to De-Active", "", {
          duration: 2000
        })
      }
    })
    
  }

  async applyfilters2() {

    console.log("1");

    var abc;

    var query = this.afs.collection(util.main).doc(util.main).collection('doctors-' + util.main).ref;

    if (this.cityHashCode != undefined) {
      abc = query.where('city.cityId', '==', this.cityHashCode)
    }

    if (this.categoryHashCode != undefined) {
      abc = query.where('category.categoryId', '==', this.categoryHashCode)
    }

    if (this.name != undefined) {
      abc = query.where('fname', '==', this.name)
    }

    if (this.phone != undefined) {
      console.log("mobile quey applied");
      abc = query.where('mobile', '==', this.phone)
    }

    if(this.sponsorHashCode != undefined)
    {
      abc = query.where('currentSponsor.sponsorHashCode','==',this.sponsorHashCode)
    }

    //abc = query.limit(10) limits and all can be applied here

    console.log(abc);

    // either implement snapshot here or update the loca object as done in status
    // other way around can be after editing the doctor i can call the applyfiltersagain , this trick will keep data in sync
   await abc.get().then(val => {
      this.doctors = [];
      val.forEach(a => {
        const item: any = a.data();
        var obj = new DoctorModel();
        obj = item;
        //console.log(obj);
        this.doctors.push(obj);
      })
    })

    if(this.doctors.length == 0)
    {
      this.snackbar.open("No Data Availaible Yet ", "",{
        duration : 2000
      })
    }

  }

  edit(obj : DoctorModel)
  {
    // after editing call applyfilters2 that way data will always be in sync
    console.log("left")
    this.router.navigate(['show-users',obj.doctorId])
    //this.dialog.open(ShowUsersComponent);
    // navigaet to show users componet ans pass doc id to it
  }

  info(obj : DoctorModel)
  {
    // var config = new MatDialogConfig();
    // config.data = {
    //   'obj' : obj
    // }
    // this.dialog.open(DoctorInfoModalComponent, config);
    // // fetch the doctor session at that
    // console.log("left")
    // this.shared.hash = obj.doctorId;
    this.router.navigate(['/search_phone',obj.doctorId]);
    // how about routing the page here 
  }

  



}


