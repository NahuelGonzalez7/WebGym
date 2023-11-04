import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
{
  path: 'landing', component: LandingPageComponent, 

},
{
  path:'home', 
  component: HomeComponent
  /*hacer el lazy loading*/
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
