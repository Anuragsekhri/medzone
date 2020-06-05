import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AddCityComponent } from 'app/add-city/add-city.component';
import { AuthGuard } from 'app/auth/auth-guard.service';
import { AdddoctorcategoryComponent } from 'app/adddoctorcategory/adddoctorcategory.component';
import { AdddrlistComponent } from 'app/adddrlist/adddrlist.component';


export const AdminLayoutRoutes: Routes = [

    // }
    { path: 'dashboard',      component: DashboardComponent , canActivate:[AuthGuard] },
    { path: 'addcity',      component: AddCityComponent },
    { path: 'adddoctorcategory',      component: AdddoctorcategoryComponent , canActivate :[AuthGuard]},
    { path: 'user-profile',   component: AdddrlistComponent , canActivate : [AuthGuard] },
   
];
