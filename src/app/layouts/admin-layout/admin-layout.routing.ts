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
import { SearchByPhoneComponent } from 'app/search-by-phone/search-by-phone.component';
import { MedicinesComponent } from 'app/medicines/medicines.component';


export const AdminLayoutRoutes: Routes = [

    // }
    { path: 'dashboard',      component: DashboardComponent , canActivate :[AuthGuard] },
    { path: 'addcity',      component: AddCityComponent , canActivate :[AuthGuard]},
    { path: 'addsponsor',      component: AddsponsorComponent , canActivate :[AuthGuard]},
    { path: 'adddoctorcategory',      component: AdddoctorcategoryComponent , canActivate :[AuthGuard]},
    { path: 'addqualifications',      component: QualificationsComponent , canActivate :[AuthGuard]},
    { path: 'user-profile',   component: AdddrlistComponent  },
    { path: 'show-users/:id',   component: ShowUsersComponent ,  },
    { path: 'show-users',   component: ShowUsersComponent ,  },
    { path: 'search_phone/:id',   component: SearchByPhoneComponent   },
    {path : 'medicines' , component : MedicinesComponent}
   
];
