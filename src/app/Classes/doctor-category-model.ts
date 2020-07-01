import { firestore } from "firebase";

export class DoctorCategoryModel {

    categoryId : string;
    name : string;

    categoryDate : firestore.Timestamp;
    // need this when doctor is created 
}
