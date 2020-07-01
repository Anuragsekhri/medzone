import { Experience } from "./Experience";
import { Qualification } from "./Qualification";
import { DoctorCategoryModel } from "./doctor-category-model";
import { Sponsor } from "./Sponsor";
import { CityModel } from "./city-model";


export class DoctorModel {
    doctorId  : string;   
    
    //name : string;
    fname : string;
    lname : string;
    doctorImage : File;
    doctorImageUrl : string;
    gender : number ; // 0 male , 1 female , 2 other
    salutation : number ; // 0 Dr , 1 Mr , 2 Ms , 3 Mrs 

    email : string;
    mobile : string

    inPersonFee : number;
    throughVideoFee : number;
   
    active : boolean;  // 0 active 1 deactive
   
    address : string;

    uniqueId : string;
    city : CityModel;
    authId : string;

    category : DoctorCategoryModel;
    qualifications : Qualification[];

    workExperience : Experience[];

    currentSponsor : Sponsor;




}
