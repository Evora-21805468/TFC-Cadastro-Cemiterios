import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './login/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { RegistoComponent } from './registo/registo.component';
import {ConsultarUsersComponent} from "./consultarUsers/consultarUsers.component";


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistoComponent,
    ConsultarUsersComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        AngularFirestoreModule
    ],
  providers: [AuthService,AngularFirestore],
  bootstrap: [MainComponent]
})
export class AppModule { }
