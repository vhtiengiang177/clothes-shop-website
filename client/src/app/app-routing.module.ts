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
import { OrderPageComponent } from './modules/user/order-page/order-page.component';
import { MyAccountPageComponent } from './modules/user/my-account-page/my-account-page.component';
import { UserInfoComponent } from './modules/user/my-account/user-info/user-info.component';
import { ShopsListComponent } from './modules/admin/shops/shops-list/shops-list.component';
import { DeliveryAddressComponent } from './modules/user/my-account/delivery-address/delivery-address.component';
import { ChangePasswordComponent } from './modules/user/my-account/change-password/change-password.component';
import { PromotionPageComponent } from './modules/user/promotion-page/promotion-page.component';


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
    path: 'admin/shops',
    component: ShopsListComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders-process',
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
    path: 'check-out',
    component: OrderPageComponent,
    canActivate: [AuthGuard, ClientAuthGuard]
  }, {
    path: 'promotions',
    component: PromotionPageComponent
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
  },
  {
    path: 'my-account',
    component: MyAccountPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserInfoComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'delivery-address',
        component: DeliveryAddressComponent,
        canActivate: [AuthGuard]
      }, 
      {
        path: 'change-password',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
