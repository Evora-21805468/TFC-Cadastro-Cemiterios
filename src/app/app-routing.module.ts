import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './layouts/main/main.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {AuthGuard} from './guards/auth.guard';
import {RegistoComponent} from './registo/registo.component';
import { ConsultarUsersComponent } from './consultarUsers/consultarUsers.component';
import {ConsultarMonumentoComponent} from "./consultarMonumentos/consultarMonumento.component";

// @ts-ignore

const routes: Routes = [
  {
    path: 'login',
    component:  LoginComponent
  },
  {
    path: 'registo',
    component:  RegistoComponent
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consultarusers',
    component: ConsultarUsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consultarMonumento',
    component: ConsultarMonumentoComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
