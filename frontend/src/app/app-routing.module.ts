import { SigninComponent } from './auth/components/signin/signin.component';
import { HomeComponent } from './pages/components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaWishComponent } from './pages/components/tabela-wish/tabela-wish.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthGuard } from './auth/guard/auth.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'wish',
    component: TabelaWishComponent,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
