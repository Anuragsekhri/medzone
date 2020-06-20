import { firestore } from "firebase";
export class Experience {
    name: string ;
    startDate: firestore.Timestamp;   // i need to do timestamp here
    endDate: firestore.Timestamp;
    certificate : File; // only i need this
    imageUrl : string; 

    
}
