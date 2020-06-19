export class Experience {
    name: string ;
    startDate: Date;
    endDate: Date;
    certificate : File; // only i need this
    imageUrl : string; 

    Experience(){
        this.name  = undefined;
        this.startDate = new Date();
        this.endDate = new Date();
        this.certificate = undefined;
        this.imageUrl  = "";

    }
}
