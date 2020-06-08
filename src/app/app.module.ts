import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule  } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { environment } from 'environments/environment';
import { AddcitymodalComponent } from './addcitymodal/addcitymodal.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './auth/auth.service';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ShowUsersComponent } from './show-users/show-users.component';
import { QualificationsComponent } from './qualifications/qualifications.component';
import { QualificationmodalComponent } from './qualificationmodal/qualificationmodal.component';
import { AddcategorymodalComponent } from './addcategorymodal/addcategorymodal.component';
import { AdddoctorcategoryComponent } from './adddoctorcategory/adddoctorcategory.component';





@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    HttpModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatRippleModule,
    MatFormFieldModule,
    MatTooltipModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AddcitymodalComponent,
    AuthComponent,
    UserProfileComponent,
    QualificationmodalComponent,
    AddcategorymodalComponent,
   // ShowUsersComponent
    //AdddrlistComponent,
   
    

  ],
  entryComponents:[ AddcitymodalComponent , UserProfileComponent , QualificationmodalComponent , AddcategorymodalComponent],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
