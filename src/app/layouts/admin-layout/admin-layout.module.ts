import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { NgModule } from '@angular/core';
import {MatStepperModule} from '@angular/material/stepper';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AddCityComponent } from 'app/add-city/add-city.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdddoctorcategoryComponent } from 'app/adddoctorcategory/adddoctorcategory.component';
import { AdddrlistComponent } from 'app/adddrlist/adddrlist.component';
import { ShowUsersComponent } from 'app/show-users/show-users.component';
import { QualificationsComponent } from 'app/qualifications/qualifications.component';
import { MatCardModule } from '@angular/material/card';
import { AddsponsorComponent } from 'app/addsponsor/addsponsor.component';
import { SearchByPhoneComponent } from 'app/search-by-phone/search-by-phone.component';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerInput, MatDatepickerModule } from '@angular/material/datepicker';
import { MedicinesComponent } from 'app/medicines/medicines.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatListModule,
    MatStepperModule,
    MatTableModule,
    MatSelectModule,
    MatTooltipModule,
  ],
  declarations: [
    DashboardComponent,
    //UserProfileComponent,
    QualificationsComponent,
    AddCityComponent,
    ShowUsersComponent,
    AdddrlistComponent,
    AdddoctorcategoryComponent,
    AddsponsorComponent,
    SearchByPhoneComponent,
    MedicinesComponent
   
  ]
})

export class AdminLayoutModule {}
