import { Experience } from "./Experience";
import { Qualification } from "./Qualification";
import { DoctorCategoryModel } from "./doctor-category-model";
import { Sponsor } from "./Sponsor";
import { CityModel } from "./city-model";


export class DoctorModel {
    doctorId  : string;    // auth se return hogyi 

    name : string;   //save name in uppercase
    email : string;
    mobile : string
    // qualification : string[];
    active : boolean;  // 0 active 1 deactive
    //cityId : string;
    address : string;

    uniqueId : string;
    city : CityModel;

    category : DoctorCategoryModel;
    qualifications : Qualification[];

    workExperience : Experience[];

    currentSponsor : Sponsor;


    // authId te doctorId same rkhni hai -- yes


}
