import { Component, OnInit } from '@angular/core';
import { CityModel } from 'app/Classes/city-model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import * as util from '../util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';

import { HttpHeaders, HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  name : string;
  email : string;
  phone : string;
  address : string ;

  cityId : string ;

  loading : boolean = false;

  cities : CityModel[];

  constructor(private afs : AngularFirestore  , private snackbar : MatSnackBar ,
    private functions : AngularFireFunctions, private dialog : MatDialog,
    private http: HttpClient
    ) { }

    close()
    {
      this.dialog.closeAll();
    }

  ngOnInit() {
    this.cities =[];

    this.afs.collection(util.main).doc(util.main).collection('cities-'+util.main).snapshotChanges().subscribe(
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
    console.log(this.cityId);
    
    
    if (this.name === "") {
      this.snackbar.open("Invalid User Name" ,"",{
        duration:2000
      });
      this.loading = false;
      return;
    }
    if(this.cityId == undefined || this.cityId.length <=1)
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

  



    this.authenticateEmployee(this.phone, this.email, phoneExists, emailExists).subscribe(async (response) => {
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
        var authId = response.uid;
        // add data here
        
        this.afs.collection(util.main).doc(util.main).collection('doctors-'+util.main).doc(authId).set(
          {
            'name' : this.name,
            'email' : this.email,
            'cityId' : this.cityId,
            'active' : true,
            'address' : this.address,
            'doctorId' : authId,
            'mobile' : this.phone
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

}
