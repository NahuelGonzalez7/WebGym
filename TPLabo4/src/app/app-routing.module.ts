import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomeComponent } from './home/home/home.component';

const routes: Routes = [
{
  path: '', component: LandingPageComponent, 

},
{
  path:'home', component: HomeComponent
  /*hacer el lazy loading*/
},
{
path: '',
redirectTo: '',
pathMatch: 'full'
},


]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
