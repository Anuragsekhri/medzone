class Qualification
{
    name : string;
    qualificationHashCode : string;
}
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
    workExperience : string[];

    currentSponsor : {}  // in map put sponsor name and its duaration


    // authId te doctorId same rkhni hai -- yes


}
