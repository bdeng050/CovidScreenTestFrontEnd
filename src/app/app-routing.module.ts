import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
//import { AutocompleteComponent } from './component/dontComeToWork/autocomplete.component';
import { CheckboxComponent } from './component/checkbox/checkbox.component';
import { CovidScreenComponent } from './component/covid-screen/covid-screen.component';
import { DontComeToWorkComponent } from './component/dont-come-to-work/dont-come-to-work.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './component/profile/profile.component';
import { PlzComponent } from './component/plz/plz.component';

const routes: Routes = [
  //{ path: '', pathMatch: 'full', redirectTo: 'login' },
  //{ path: 'dontComeToWork', component: DontComeToWorkComponent},
  //{ path: 'register', component: RegisterComponent }
  { path: 'CheckBox', component: CheckboxComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'covid', component: CovidScreenComponent},
  {path: 'dont', component: DontComeToWorkComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'plz', component: PlzComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
