import { firestore } from "firebase";

export class Sponsor {
    name: string;
    sponsorHashCode: string;
    sponsorStartDate : firestore.Timestamp;
    sponsorEndDate : firestore.Timestamp;
    
    sponsorImage : File;
    sponsorImageUrl : string;

    // to help mes with local conversion 
    sponsorStartDateo : Date;
    sponsorEndDateo : Date;
}
