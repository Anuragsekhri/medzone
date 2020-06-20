import { firestore } from "firebase";

export class Session {
    
    averageTime : number;
    creationDtae : firestore.Timestamp;
    fromTime : firestore.Timestamp;
    group : number;
    name : string;
    noOfSlots : number;
    scheduleIdList : string[];
    sessionId : string;
    slotId : string;
    toTime : firestore.Timestamp;
    type : number;
    // to ask what this type is for
}
