import { firestore } from "firebase";
import { GroupSlot } from "./GroupSlot";
import { SingleSlot } from "./single-slot";

export class Slot {

    averageTime : number;
    createDate : firestore.Timestamp;
    fromTime : firestore.Timestamp;
    group : number;
    groupSlotsMap : Map<string,GroupSlot>;

    singleSlotsMap : Map<string,SingleSlot>
    toTime : firestore.Timestamp;
    type : number;
    // 0 online 1 offline
}
