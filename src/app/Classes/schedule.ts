import { Session } from "./session";

export class Schedule {

    name : string;
    noOfSessions : number;
    scheduleId : string;
    sequence : number; // i dont know what this do
    sessions : Session[];
}

