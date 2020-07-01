import { Component, OnInit, Inject } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { utils } from 'protractor';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFireStorage } from '@angular/fire/storage';
import { getGlobalStats } from 'app/getGlobalStats';

@Component({
  selector: 'app-sponsormodal',
  templateUrl: './sponsormodal.component.html',
  styleUrls: ['./sponsormodal.component.css']
})
export class SponsormodalComponent implements OnInit {

  name : string;
  hash : string;
  sponsorImage : File;
  sponsorImageUrl : string;
  spin : boolean;

  constructor(private afs : AngularFirestore , private snackbar : MatSnackBar ,private storage : AngularFireStorage ,
    private ref : MatDialogRef<SponsormodalComponent> , private global : getGlobalStats
    , @Inject(MAT_DIALOG_DATA) data) {

      this.sponsorImageUrl = "";
      if( data != undefined)
      {
        this.name = data.obj.name;
        this.hash = data.obj.sponsorHashCode;
        if(data.obj.sponsorImageUrl != undefined && data.obj.sponsorImageUrl.length >= 2)
        {
          this.sponsorImageUrl = data.obj.sponsorImageUrl;
        }
        console.log(this.name + "" + this.hash);
      }
     }

  ngOnInit(): void {
    this.spin = false;
  }

 async save()
  {

    if(this.name != undefined && this.name.length >= 1 && this.hash == undefined)
    {
    var id = this.afs.createId();
    this.spin = true;

    if(this.sponsorImage != undefined)
      {
      const file = this.sponsorImage;
      const filename = this.sponsorImage.name;
      const filepath = "sponsors/"+ id +"profile_image";
      const fileRef = this.storage.ref(filepath);
      const uploadTask = this.storage.upload(filepath,file);
     

      await uploadTask.snapshotChanges().pipe().toPromise().then (  () =>{
        return fileRef.getDownloadURL().toPromise().then( result => {
          console.log(result);
          this.sponsorImageUrl = result;
        })
      })
    }
    


   await this.afs.collection(util.main).doc(util.main).collection('sponsors-'+util.main).doc(id).set(
      {
        'name' : this.name,
        'sponsorHashCode' : id,
        'sponsorImageUrl' : this.sponsorImageUrl
      })

      this.spin = false;
      var obj ={};
      

      
      this.ref.close();
      this.snackbar.open("New Sposnor Added","",{
        duration : 2000
      })
    }
    else if(this.name != undefined && this.name.length >= 1 && this.hash != undefined)
    {
      this.spin = true;
      if(this.sponsorImage != undefined)
      {
      const file = this.sponsorImage;
      const filename = this.sponsorImage.name;
      const filepath = "sponsors/"+ this.hash +"profile_image";
      const fileRef = this.storage.ref(filepath);
      const uploadTask = this.storage.upload(filepath,file);
     

      await uploadTask.snapshotChanges().pipe().toPromise().then (  () =>{
        return fileRef.getDownloadURL().toPromise().then( result => {
          console.log(result);
          this.sponsorImageUrl = result;
        })
      })
      }
      
     var changed = "";
     if(this.name.length >= 1)
     {
       changed = this.name;
     }
      await this.afs.collection(util.main).doc(util.main).collection('sponsors-'+util.main).doc(this.hash).update(
        {
          'name' : changed,
          'sponsorImageUrl' : this.sponsorImageUrl
         
        })
  
        
        this.ref.close();
        this.spin = false;
        this.snackbar.open(" Sposnor Updated","",{
          duration : 2000
        })
    }

    else{
         this.ref.close();
        this.snackbar.open(" Sposnor Name cant be empty","",{
          duration : 2000
        })

    }
  }

  check()
  {
    if(this.sponsorImageUrl != undefined)
    return false;
    else
    return true;
  }

  check2()
  {
    if(this.sponsorImageUrl == undefined)
    return false;
    else
    return true;
  }

  upload(event){
    this.sponsorImage = event.target.files[0];
  }
}
