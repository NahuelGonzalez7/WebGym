import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './home/home/home.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
{
  path: 'landing', component: LandingPageComponent, 

},
{
  path:'home', 
  component: HomeComponent
},
{
  path:'register',
  component: RegisterComponent
},
{
  path: '',
  redirectTo: 'landing',
  pathMatch: 'full'
},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
