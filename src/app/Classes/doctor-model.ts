import { Experience } from "./Experience";
import { Qualification } from "./Qualification";

export class DoctorModel {
    doctorId  : string;    // auth se return hogyi 

    name : string;   //save name in uppercase
    email : string;
    mobile : string
    qualification : string[];
    active : boolean;  // 0 active 1 deactive
    cityId : string;
    Address : string;

    category : string;
    qualifications : Qualification[];

    workExperience : Experience[];


    // authId te doctorId same rkhni hai -- yes


}
