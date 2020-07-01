import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as util from '../util'
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MedicineModalComponent } from 'app/medicine-modal/medicine-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as readXlsxFile from 'read-excel-file'
import * as XLSX from 'ts-xlsx';
import { Xliff } from '@angular/compiler';
 
class Medicine{
  name : string;
  genericName : string;
  quantity : number;
  hash : string;
  companyName : string;
}

@Component({
  selector: 'app-medicines',
  templateUrl: './medicines.component.html',
  styleUrls: ['./medicines.component.css']
})


export class MedicinesComponent implements OnInit {

  arrayBuffer:any;
  load : boolean;

  constructor(private afs : AngularFirestore , private dialog : MatDialog , private snackbar : MatSnackBar ) { }
  alphabets : String[];
  file : File;
  medicines : Medicine[];
  selected : string;
  isClicked = false;
  limit : number = 2; // later change it to 10

  prvslength : number;


  ngOnInit(): void {
    
    this.load = false;
    this.prvslength = 0;
    this.alphabets = ["A","B","C","D" ,"E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  }

  async select2(a)
  {
    this.limit = 10;
    await this.select(a)
  }

 async select(a)
  {
   
    this.selected = a;
    this.medicines = [];
    await  this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main).doc(this.selected)
    .collection('medicines-'+util.main , ref => ref.limit(this.limit)).get().toPromise().then(
      val => {
        val.forEach( a => {
          const item : any = a.data();
          var o = new Medicine();
          o = item;
          this.medicines.push(o);
        })
      }
    )
    if( this.prvslength == this.medicines.length)
    {
      this.snackbar.open("No More Data to Load ","",{
        duration: 2000
      })
    }
    else{
      this.prvslength = this.medicines.length;
    }
    

  }
  add()
  {
    
    this.dialog.open(MedicineModalComponent).afterClosed().toPromise().then(
      val =>{
        console.log("calling again");
        
        if(this.selected != undefined)
        this.select(this.selected);
      }
    );
    
   
    
    
  }

  edit(med )
  {
    var config = new MatDialogConfig();
    config.data = {
      'obj' : med
    }
    this.dialog.open(MedicineModalComponent,config).afterClosed().toPromise().then(
      val=>{
        console.log("calling again");
        
        if(this.selected != undefined)
        this.select(this.selected);

      }
    )

    
  }

  async delete(med , i)
  {
    var string = String( med.name.charAt(0) ).toUpperCase();
    await this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main).doc(string).collection('medicines-'+util.main)
    .doc(med.hash).delete();

    //this.medicines.splice(i,1); its better to reload than saving locally
    this.select(this.selected);

    // elemented delted locally too
  }

  loadmore()
  {
    this.limit = this.limit+10;
    this.select(this.selected);
  }

  incomingfile(event) 
  {
  this.file= event.target.files[0]; 
  }

  async Upload()
  {
    if(this.file == undefined)
    {
      this.snackbar.open("Please Provide Excel file before uploading Data","",{
        duration:2000
      })
      return;
    }
    this.load = true;
    let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
           
            
            XLSX.utils.sheet_to_json(worksheet,{raw:true}).forEach( async a=>{
              console.log(a);
             
              var x = String(a['name'].charAt(0)).toUpperCase();
              var id = this.afs.createId();
              var str = "";
              str = str + a['name'] + a['genericName'] +a['companyName'] + a['quantity'];
              str = str.replace(/\s+/g, '');
              str = str.toLowerCase();
              console.log(str);
              
              if(a['name'] == undefined) a['name'] = "";
              if(a['genericName'] == undefined) a['genericName'] = "";
              if(a['companyName'] == undefined) a['companyName'] = "";
              if(a['quantity'] == undefined) a['quantity'] = 0;

              // await this.afs.collection(util.main).doc(util.main).collection('medicines-'+util.main).doc(x)
              // .collection('medicines-'+util.main).doc(id).set({
              //   'name' : a['name'],
              //   'genericName' : a['genericName'],
              //   'quantity' : a['quantity'],
              //   'companyName' :a['companyName'],
              //   'hash' : id
              // })

            })
            this.load = false;
          this.snackbar.open("Medicines Added", "",{
            duration : 2000
           } )
            
          }
          
          
        fileReader.readAsArrayBuffer(this.file)
              

  }


}
