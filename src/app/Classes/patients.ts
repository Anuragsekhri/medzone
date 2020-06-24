import { firestore } from "firebase";
import { Relation } from "./Relation";
import { Patients_Doc } from "./Patients_Doc";

export class Patients {

    age : string;
    date : firestore.Timestamp;
    email : string;
    linkedDoctorsArray : string[];
    gender : string;
    linkedDoctorsList : Map<string,Patients_Doc>;
    name : string;
    phone : string;
    relationList : Map<string,Relation>;
    uid : string;


}
