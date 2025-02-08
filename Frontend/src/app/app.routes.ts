import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch:  'full' },  // Main page that will redirect to home
  { path: 'home', component: HomeComponent},
];

