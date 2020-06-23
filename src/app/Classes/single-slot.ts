import { firestore } from "firebase";

export class SingleSlot {
    appointmentId : string;
    filled : boolean;
    from : firestore.Timestamp;
    to : firestore.Timestamp;
}
