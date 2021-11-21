import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { ProductsListComponent } from './modules/admin/products/products-list/products-list.component';
import { LoginPageComponent } from './modules/authentication/login-page/login-page.component';
import { HomePageComponent } from './modules/user/home-page/home-page.component';
import { ActivatedLogin } from './services/activated-login/activated-login.service';
import { ProductPageComponent } from './modules/user/product-page/product-page.component';
import { RegisterPageComponent } from './modules/authentication/register-page/register-page.component';


const routes: Routes = [
  {
    path: 'admin', 
    component: DashboardComponent
  },
  {
    path: 'admin/products',
    component: ProductsListComponent
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'products',
    component: ProductPageComponent
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [ActivatedLogin]
  },
  {
    path: 'register',
    component: RegisterPageComponent,
    canActivate: [ActivatedLogin]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
