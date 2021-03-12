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
import {ConsultarMonumentoComponent} from "./consultarMonumentos/consultarMonumento.component";
import {HttpClientModule} from '@angular/common/http'
import {HttpClient} from '@angular/common/http'
import {RequestOptions, Request, RequestMethod, HttpModule} from '@angular/http';
import {DetailConsultarMonumentoComponent} from "./consultarMonumentos/detailConsultarMonumento.component";
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


@NgModule({
  declarations: [
    MainComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegistoComponent,
    ConsultarUsersComponent,
    ConsultarMonumentoComponent,
    DetailConsultarMonumentoComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFireDatabaseModule,
        ReactiveFormsModule,
        AngularFirestoreModule,
        HttpClientModule,
        HttpModule,
        NgxSpinnerModule,
      BrowserAnimationsModule

    ],
  providers: [AuthService,AngularFirestore],
  bootstrap: [MainComponent]
})
export class AppModule { }
