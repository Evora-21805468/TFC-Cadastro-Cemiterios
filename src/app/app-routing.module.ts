import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './layouts/main/main.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {AuthGuard} from './guards/auth.guard';
import {RegistoComponent} from './registo/registo.component';
import { ConsultarUsersComponent } from './consultarUsers/consultarUsers.component';
import {ConsultarMonumentoComponent} from "./consultarMonumentos/consultarMonumento.component";
import {DetailConsultarMonumentoComponent} from "./consultarMonumentos/detailConsultarMonumento.component";
import {MapComponent} from "./map/map.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {TabelaComponent} from "./tabela/tabela.component";
import {InfoComponent} from "./info/info.component";
import {ContactosComponent} from "./contactos/contactos.component";
import {EditMonumentoComponent} from "./editMonumento/editMonumento.component";
import { RecuperacaoComponent } from './recuperacao/recup.component';

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
    path: 'recuperacao',
    component:  RecuperacaoComponent
  },
  {
    path: '',
    component: MapComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '/',
    component: MapComponent,
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
  },
  {
    path: 'consultarMonumento/:id/view',
    component: DetailConsultarMonumentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editMonumento/:id/view',
    component: EditMonumentoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'consultarTabela',
    component: TabelaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'info',
    component: InfoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contactos',
    component: ContactosComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
