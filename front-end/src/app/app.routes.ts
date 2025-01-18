import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';

export const routes: Routes = [
  { path: '', component: LoginPageComponent },
  { path: 'list', component: ListPageComponent },
  { path: '**', redirectTo: '' }
];