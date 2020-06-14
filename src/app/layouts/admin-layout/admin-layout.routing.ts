import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AddCityComponent } from 'app/add-city/add-city.component';
import { AuthGuard } from 'app/auth/auth-guard.service';
import { AdddoctorcategoryComponent } from 'app/adddoctorcategory/adddoctorcategory.component';
import { AdddrlistComponent } from 'app/adddrlist/adddrlist.component';
import { ShowUsersComponent } from 'app/show-users/show-users.component';
import { QualificationsComponent } from 'app/qualifications/qualifications.component';
import { AddsponsorComponent } from 'app/addsponsor/addsponsor.component';


export const AdminLayoutRoutes: Routes = [

    // }
    { path: 'dashboard',      component: DashboardComponent  },
    { path: 'addcity',      component: AddCityComponent },
    { path: 'addsponsor',      component: AddsponsorComponent },
    { path: 'adddoctorcategory',      component: AdddoctorcategoryComponent , canActivate :[AuthGuard]},
    { path: 'addqualifications',      component: QualificationsComponent },
    { path: 'user-profile',   component: AdddrlistComponent  },
    { path: 'show-users',   component: ShowUsersComponent , canActivate : [AuthGuard] },
   
];
