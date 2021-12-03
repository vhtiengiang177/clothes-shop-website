import { OrdersDetailComponent } from './modules/admin/orders/orders-detail/orders-detail.component';
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
import { ProductDetailComponent } from './modules/admin/products/product-detail/product-detail.component';
import { OrdersApprovalListComponent } from './modules/admin/orders/orders-approval-list/orders-approval-list.component';
import { OrdersProcessListComponent } from './modules/admin/orders/orders-process-list/orders-process-list.component';
import { OrdersDeliveryListComponent } from './modules/admin/orders/orders-delivery-list/orders-delivery-list.component';
import { OrdersCompletedListComponent } from './modules/admin/orders/orders-completed-list/orders-completed-list.component';
import { OrdersCancelledListComponent } from './modules/admin/orders/orders-cancelled-list/orders-cancelled-list.component';
import { OrdersReturnListComponent } from './modules/admin/orders/orders-return-list/orders-return-list.component';
import { ProductDetailPageComponent } from './modules/user/product-detail-page/product-detail-page.component';
import { CartPageComponent } from './modules/user/cart-page/cart-page.component';
import { ClientAuthGuard } from './services/client-auth-guard/client-auth-guard.service';


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
    path: 'admin/products/:id',
    component: ProductDetailComponent,
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
    path: 'admin/orders-processing',
    component: OrdersProcessListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-approval',
    component: OrdersApprovalListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-delivery',
    component: OrdersDeliveryListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-completed',
    component: OrdersCompletedListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-cancelled',
    component: OrdersCancelledListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-return',
    component: OrdersReturnListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-process/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-approval/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-delivery/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-completed/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-cancelled/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-return/:id',
    component: OrdersDetailComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/not-found',
    component: NotFoundComponent,
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
    path: 'shopping-cart',
    component: CartPageComponent,
    canActivate: [AuthGuard, ClientAuthGuard]
  },
  {
    path: 'product-detail/:id',
    component: ProductDetailPageComponent
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
  }, 
  {
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
