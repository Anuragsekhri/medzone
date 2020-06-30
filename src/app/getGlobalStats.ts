import { AngularFirestore} from '@angular/fire/firestore'
import * as util from './util';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class getGlobalStats{

    constructor(private afs : AngularFirestore)
    {

    }

    async getstats()
    {
        var obj ={}
        await this.afs.collection(util.main).doc(util.main).collection('globalStatsOnce-'+util.main).doc('globalStatsOnce-'+util.main)
        .get().toPromise().then( val =>{


            const item : any = val.data();
            

            if(item == undefined)
            {
                obj['noOfCities'] = 0;
                obj['noOfDoctorCategories'] = 0;
                obj['noOfSponsors'] = 0;
               
            }
            else
            {
            if(item.noOfCities == undefined)
            obj['noOfCities'] = 0;
            else
            obj['noOfCities'] = item.noOfCities ;

            if(item.noOfDoctorCategories == undefined)
            obj['noOfDoctorCategories'] = 0;
            else
            obj['noOfDoctorCategories'] = item.noOfDoctorCategories ;

            if(item.noOfSponsors == undefined)
            obj['noOfSponsors'] = 0;
            else
            obj['noOfSponsors'] = item.noOfSponsors ;
            }

        })

        return obj;
    }
}
