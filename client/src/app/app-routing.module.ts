import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { ProductsListComponent } from './modules/admin/products/products-list/products-list.component';
import { LoginPageComponent } from './modules/authentication/login-page/login-page.component';
import { HomePageComponent } from './modules/user/home-page/home-page.component';
import { ActivatedLogin } from './services/activated-login/activated-login.service';
import { ProductPageComponent } from './modules/user/product-page/product-page.component';
import { RegisterPageComponent } from './modules/authentication/register-page/register-page.component';
import { NoAccessComponent } from './_shared/components/no-access/no-access.component';
import { AuthGuard } from './services/auth-guard/auth-guard.service';
import { AdminAuthGuard } from './services/admin-auth-guard/admin-auth-guard.service';
import { VerificationComponent } from './modules/authentication/verification/verification.component';
import { NotFoundComponent } from './_shared/components/not-found/not-found.component';
import { CategoriesListComponent } from './modules/admin/categories/categories-list/categories-list.component';
import { StaffListComponent } from './modules/admin/staff/staff-list/staff-list.component';
import { CustomersListComponent } from './modules/admin/customers/customers-list/customers-list.component';
import { PromotionsListComponent } from './modules/admin/promotions/promotions-list/promotions-list.component';
import { OrdersListComponent } from './modules/admin/orders/orders-list/orders-list.component';


const routes: Routes = [
  {
    path: 'admin', 
    component: DashboardComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: ProductsListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/categories',
    component: CategoriesListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/customers',
    component: CustomersListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/staff',
    component: StaffListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/promotions',
    component: PromotionsListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: OrdersListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
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
  }, {
    path: 'no-access',
    component: NoAccessComponent
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'verification',
    component: VerificationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
