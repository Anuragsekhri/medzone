import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CityModel } from 'app/Classes/city-model';
import { DoctorCategoryModel } from 'app/Classes/doctor-category-model';
import { Experience } from 'app/Classes/Experience';
import { Sponsor } from 'app/Classes/Sponsor';
import { Observable, of } from 'rxjs';
import * as util from '../util';



class Qualification
{
  name : string;
  qualificationHashCode : string;
  image : File;
  imageUrl : string;
}

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  //name : string;
  fname : string;
  lname : string;


  doctorImage : File;
  doctorImageUrl : string = "";

  gender : number;
  salutation : number;
  

  email : string;
  phone : string;
  address : string ;

  qualfinal : any[];
  experiencesfinal : any[];

  sponsorStartDate : Date;
  sponsorEndDate : Date;

  sponsor : Sponsor;
  onpage :string = "Add"

  sponsors : Sponsor[];

  show : boolean = false;

  city : CityModel ;

  authId : string;

  loading : boolean = false;

  cities : CityModel[];

  qualifications : Qualification[];
  categories : DoctorCategoryModel[];

  inPersonFee : number;
  throughVideoFee : number;

  qual : Qualification[];
  cat : DoctorCategoryModel;

  experinces : Experience[];

  productForm: FormGroup;

  constructor(private afs : AngularFirestore  , private snackbar : MatSnackBar , 
    private functions : AngularFireFunctions, private dialog : MatDialog, private staorage : AngularFireStorage,
    private http: HttpClient , private fb : FormBuilder
    ) {
      
     }
    
  
     
    
    close()
    {
      this.dialog.closeAll();
    }

  async ngOnInit() {
    this.salutation = 0;// by deafult 0
    this.cities =[];
    this.inPersonFee = 0;
    this.throughVideoFee = 0;


  await  this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).snapshotChanges().subscribe(
      val =>{
        this.cities =[];
        val.forEach( a => {
          const item : any = a.payload.doc.data();
          var obj = new CityModel();
          obj = item;
          this.cities.push(obj);
        })
      }
    )

    await  this.afs.collection(util.main).doc(util.main).collection('doctorCategory-'+util.main).snapshotChanges().subscribe(
      val =>{
        this.categories =[];
        val.forEach( a => {
          const item : any = a.payload.doc.data();
          var obj = new DoctorCategoryModel();
          obj = item;
          this.categories.push(obj);
        })
      }
    )

    await this.afs.collection(util.main).doc(util.main).collection('qualifications-' + util.main).snapshotChanges().subscribe(
      val => {
        this.qualifications = [];
        val.forEach(a => {
          const item: any = a.payload.doc.data();
          var obj = new Qualification();
          obj = item;
          obj.image = undefined;
          obj.imageUrl = "";
          this.qualifications.push(obj);
        });
      }
    )

    this.afs.collection(util.main).doc(util.main).collection('sponsors-' + util.main).snapshotChanges().subscribe(
      val => {
        this.sponsors = [];
        val.forEach(a => {
          const item: any = a.payload.doc.data();
          var obj = new Sponsor();
          obj = item;
          this.sponsors.push(obj);
        });
      }
    )
    

  }

  async employeeEmailExistsCheck(email: string) {

    return await this.afs.collectionGroup('doctors-'+util.main , ref=> ref.where('email','==',email)).
    get().toPromise().then(
      data => {
        // console.log(data);

        if (data.docs.length > 0) {
          return true;
        } else {
          return false;
        }
      })

  }

  async employee_NumberExists_Check(number: string) {

    // write your own query here
    return await this.afs.collectionGroup('doctors-'+util.main , ref=> ref.where('mobile','==',number)
    ).get().toPromise().then( data =>{
      if (data.docs.length > 0) {
        return true;
      } else {
        return false;
      }
    });
  }

  createUser(mobile: string, email: string, phoneExists: boolean, emailExists: boolean): Observable<{ res: any }> {

    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      })
    };


    const body = `phone=${mobile}&email=${email}&phoneExists=${phoneExists}&emailExists=${emailExists}`;
    return this.http.post<{ res: any }>("https://us-central1-medico-cms.cloudfunctions.net/createDoctor", body, httpOptions);
  }

  authenticateEmployee(mobile: string, email: string, phoneExists: boolean, emailExists: boolean): Observable<any> {
    try {

     
      return this.createUser(mobile, email , phoneExists , emailExists);
      //const authEmp = this.functions.httpsCallable('CreateUser');
      
      //return authEmp({ 'phone': mobile, 'email': email, 'phoneExists': phoneExists, 'emailExists': emailExists });
      // console.log(response.data);

      // return response;

    } catch (error) {
      console.log(error);
      return of(error);

    }


    // return this.http.post<any>('https://us-central1-trackyauribises.cloudfunctions.net/CreateUser', body, this.httpOptions);

  }

  async adddoctor() {

    this.loading = true;
    if (this.fname == undefined || this.fname == "") {
      this.snackbar.open("Invalid User Name" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }

    if(this.throughVideoFee == undefined || this.throughVideoFee < 0 || this.inPersonFee == undefined || this.inPersonFee <0)
    {
      this.snackbar.open("Please Enter Valid Fee Details" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    if(this.cat == undefined || this.qual == undefined || this.qual.length <= 0)
    {
      this.snackbar.open("Either Qualifications or Category , one is empty" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    if(this.qual == undefined || this.qual.length <= 0)
    {
      this.snackbar.open("Minimum one qualification needs to be selected" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    if(this.city == undefined || this.city.cityName.length <=1)
    {
      this.snackbar.open("City required" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    if(this.address== undefined && this.address.length <=1)
    {
      this.snackbar.open("Address required" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    if (this.phone.length !== 10) {
      this.snackbar.open("Invalid Phone Number" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    if (!(/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(this.email))) {
      this.snackbar.open("Invalid Email " ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    
    
    if(this.sponsorStartDate == undefined || this.sponsorEndDate == undefined || this.sponsor == undefined)
    {
      this.loading = false;
      this.snackbar.open("Sponsor Name , start and end date are required " , "" ,{
        duration : 2000
      })
      return;
    }
    if(this.experinces != undefined)
    {
    for(let i = 0 ; i < this.experinces.length ; i++)
    {
      if(this.experinces[i].name == undefined || this.experinces[i].startDate == undefined || this.experinces[i].endDate == undefined||
        this.experinces[i].name.length <= 1)
        {
          this.loading = false;
          this.snackbar.open("Fields (Name , Duration) of Work Experience can't be empty  " , "" ,{
            duration : 2000
          })
          return;
        }
    }
    }
    if(this.gender == undefined)
    {
      this.loading = false;
      this.snackbar.open("Gender is required " , "" ,{
        duration : 2000
      })
      return;
    }
    


    const phoneExists = await this.employee_NumberExists_Check(this.phone);
    if (phoneExists) {
      console.log('number already exists');
      this.snackbar.open(this.phone + "phone number already exists. Please try another one. " ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }

    const emailExists = await this.employeeEmailExistsCheck(this.email);
    if (emailExists) {
      console.log('Email already exists');
      this.snackbar.open(this.email + " address already exists. Please try another one." ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }

  


    // only phone is being used for auth 
    await this.authenticateEmployee(this.phone, this.email, phoneExists, emailExists).subscribe(async (response) => {
      console.log(response);

      if (response.isExist == -1) {
        console.log("Something went wrong. Please contact development team.", "Alert");
        this.loading = false;
        return true;
      } else if (response.isExist == 3) {
        console.log("Both Email and Phone number exists. Please try another ones.", "Alert");
        this.loading = false;
        // this.closeAddEditModal.nativeElement.click();
        return true;
      } else {
        this.authId = response.uid;
        // add data here
        
        var obj  = {}
        obj['name'] = this.sponsor.name;
        obj['sponsorHashCode'] = this.sponsor.sponsorHashCode;
        obj['sponsorStartDate'] = this.sponsorStartDate;
        obj['sponsorEndDate'] = this.sponsorEndDate;
        

        var obj2 = {};
        obj2['cityId'] = this.city.cityId;
        obj2['cityName'] = this.city.cityName;

        var obj3 = {};
        obj3['categoryId'] = this.cat.categoryId;
        obj3['name'] = this.cat.name;
        obj3['categoryDate'] = new Date();

        console.log(1);
        var docId = this.afs.createId();  // authid and doc id needs to be different
        
        await this.addimages(docId);
        await this.correct();

        console.log(2);

        if(this.lname == undefined)
        {
          this.lname = "";
        }
        

        this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(docId).set(
          {
            'fname' : this.fname,
            'lname' : this.lname,
            // 'name' : this.fname + " " + this.lname,
            'gender': this.gender,
            'salutation' : this.salutation,
            'email' : this.email,
            'city' : obj2,
            'inPersonFee' : this.inPersonFee,
            'throughVideoFee' : this.throughVideoFee,
            'active' : true,
            'doctorImageUrl' : this.doctorImageUrl,
            'address' : this.address,
            'authId'  : this.authId,
            'doctorId' : docId,
            'qualifications' : this.qualfinal,
            'category' : obj3,
            'workExperience' : this.experiencesfinal,
            'mobile' : this.phone,
            'currentSponsor' : obj,
            'uniqueId' : Number(this.phone).toString(32)
          }
        )

        console.log("user added in database");
        this.loading = false;
        this.dialog.closeAll();

      }

    }, error => {
     
      console.log("error returned");
      this.snackbar.open( " Something went wrong. Please contact development team., Alert (error)" ,"",{
        duration:2000
      });
      this.loading = false;
      
    });

  }

  async addimages(docId)
  {

    console.log("before test");
    
   
    
    console.log(this.experinces);
    console.log(this.qual);

    
    if(this.qual != undefined)
    {
    for(let i = 0 ; i < this.qual.length ; i++)
    {
      if(this.qual[i].image != undefined)
      {
      const file = this.qual[i].image;
      const filename = this.qual[i].image.name;
      const filepath = "doctors/"+ docId +"/qualifiactions/"+filename;
      const fileRef = this.staorage.ref(filepath);
      const uploadTask = this.staorage.upload(filepath,file);
     

      await uploadTask.snapshotChanges().pipe().toPromise().then (  () =>{
        return fileRef.getDownloadURL().toPromise().then( result => {
          console.log(result);
          this.qual[i].imageUrl = result;
        })
      })
      }
     else{
       this.qual[i].imageUrl = "";
     }

    }
    }
    console.log("after test start of work experince");

    if(this.experinces != undefined)
    {
    for(let i = 0 ; i < this.experinces.length ;i++)
    {
      if(this.experinces[i].certificate != undefined)
      {
      const file = this.experinces[i].certificate;
      const filename = this.experinces[i].certificate.name;
      const filepath = "doctors/"+docId +"/experiences/"+filename;
      const fileRef = this.staorage.ref(filepath);
      const uploadTask = this.staorage.upload(filepath,file);

     await uploadTask.snapshotChanges().pipe().toPromise().then (  () =>{
        return fileRef.getDownloadURL().toPromise().then( result => {
          console.log(result);
          this.experinces[i].imageUrl = result;
        })
      })
    }else{
      this.experinces[i].imageUrl = "";
    }
      

    }
    }
    console.log("END OF Work EXPERIENCE");

    if(this.doctorImage != undefined)
    {
    const file = this.doctorImage;
    const filename = this.doctorImage.name;
    const filepath = "doctors/"+ docId +"profile_image";
    const fileRef = this.staorage.ref(filepath);
    const uploadTask = this.staorage.upload(filepath,file);
   

    await uploadTask.snapshotChanges().pipe().toPromise().then (  () =>{
      return fileRef.getDownloadURL().toPromise().then( result => {
        console.log(result);
        this.doctorImageUrl = result;
      })
    })
    }
    else{
      this.doctorImageUrl = "";
    }
  

    
  }
    
  addqual()
  {
    console.log("qual button");
    
    if(this.show == false)
    {
    this.show = true;
    this.onpage ="De-Select All";
    }
    else{
    this.show = false;
    this.onpage = "Add"
    for(let i = 0 ; i < this.qualifications.length ; i++)
    {
      this.qualifications[i].image = undefined;
    }
    this.qual = undefined;

    }
  }

  upload(event , i)
  {
    this.qualifications[i].image = event.target.files[0];
  }

  add()
  {
    if(this.experinces == undefined)
    {
      this.experinces =[];
      this.experinces.push(new Experience());
    }
    else{
      this.experinces.push(new Experience());
    }
  }

  remove(i){
    this.experinces.splice(i,1);
  }

  upload2(event , i)
  {
    var file = event.target.files[0];
    this.experinces[i].certificate = file;
  }

  correct()
  {
    this.qualfinal = [];
    if(this.qualifications != undefined)
    {
    for(let i = 0 ; i < this.qual.length ;i++)
    {
      var obj = {};
      obj['name'] = this.qual[i].name;
      obj['qualificationHashCode'] = this.qual[i].qualificationHashCode;
      obj['imageUrl'] = this.qual[i].imageUrl;
      this.qualfinal.push(obj);
    }
    }

    this.experiencesfinal =[];
    if(this.experinces != undefined)
    {
    for(let i = 0 ; i < this.experinces.length ;i++)
    {
      var obj = {};
      obj['name'] = this.experinces[i].name;
      obj['startDate'] = this.experinces[i].startDate;
      obj['endDate'] = this.experinces[i].endDate;
      obj['imageUrl'] = this.experinces[i].imageUrl;

      this.experiencesfinal.push(obj);

    }
    }

    console.log(this.qualfinal , this.experiencesfinal);
  }


  uploadd(event)
  {
    this.doctorImage = event.target.files[0];
    console.log(this.doctorImage);
  }

}
