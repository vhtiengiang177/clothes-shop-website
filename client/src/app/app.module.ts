import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavbarComponent } from './modules/admin/layout/navbar/navbar.component';
import { SidebarComponent } from './modules/admin/layout/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './modules/admin/products/products-list/products-list.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './_shared/library/angular-material/angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './modules/admin/layout/body/body.component';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { SearchProductComponent } from './modules/admin/products/search-product/search-product.component';
import { ProductFormComponent } from './modules/admin/products/product-form/product-form.component';
import { LogproductFormComponent } from './modules/admin/products/logproduct-form/logproduct-form.component';
import { HomePageComponent } from './modules/user/home-page/home-page.component';
import { BodyUserComponent } from './modules/user/layout/body-user/body-user.component';
import { NavbarUserComponent } from './modules/user/layout/navbar-user/navbar-user.component';
import { HeaderUserComponent } from './modules/user/layout/header-user/header-user.component';
import { ProductPageComponent } from './modules/user/product-page/product-page.component';
import { LoginPageComponent } from './modules/authentication/login-page/login-page.component';
import { AuthService } from './services/auth/auth.service';
import { RegisterPageComponent } from './modules/authentication/register-page/register-page.component';
import { NoAccessComponent } from './_shared/components/no-access/no-access.component';
import { VerificationComponent } from './modules/authentication/verification/verification.component';
import { NotFoundComponent } from './_shared/components/not-found/not-found.component';
import { ContactPageComponent } from './modules/user/contact-page/contact-page.component';
import { FooterUserComponent } from './modules/user/layout/footer-user/footer-user.component';
import { CategoriesListComponent } from './modules/admin/categories/categories-list/categories-list.component';
import { StaffListComponent } from './modules/admin/staff/staff-list/staff-list.component';
import { CustomersListComponent } from './modules/admin/customers/customers-list/customers-list.component';
import { CategoriesFormComponent } from './modules/admin/categories/categories-form/categories-form.component';
import { PromotionsListComponent } from './modules/admin/promotions/promotions-list/promotions-list.component';
import { OrdersListComponent } from './modules/admin/orders/orders-list/orders-list.component';
import { ProductDetailComponent } from './modules/admin/products/product-detail/product-detail.component';
import { FooterComponent } from './modules/admin/layout/footer/footer.component';
import { ConfirmFormComponent } from './modules/common/confirm-form/confirm-form.component';
import { PromotionFormComponent } from './modules/admin/promotions/promotion-form/promotion-form.component';
import { StaffFormComponent } from './modules/admin/staff/staff-form/staff-form.component';
import { StaffAddFormComponent } from './modules/admin/staff/staff-add-form/staff-add-form.component';
import { OrdersProcessListComponent } from './modules/admin/orders/orders-process-list/orders-process-list.component';
import { OrdersApprovalListComponent } from './modules/admin/orders/orders-approval-list/orders-approval-list.component';
import { OrdersDeliveryListComponent } from './modules/admin/orders/orders-delivery-list/orders-delivery-list.component';
import { OrdersCompletedListComponent } from './modules/admin/orders/orders-completed-list/orders-completed-list.component';
import { OrdersCancelledListComponent } from './modules/admin/orders/orders-cancelled-list/orders-cancelled-list.component';
import { OrdersReturnListComponent } from './modules/admin/orders/orders-return-list/orders-return-list.component';
import { OrdersDetailComponent } from './modules/admin/orders/orders-detail/orders-detail.component';
import { DeliveryListComponent } from './modules/admin/delivery/delivery-list/delivery-list.component';
import { ProductDetailPageComponent } from './modules/user/product-detail-page/product-detail-page.component';
import { CartPageComponent } from './modules/user/cart-page/cart-page.component';
import { ProductAddCartFormComponent } from './modules/user/product-add-cart-form/product-add-cart-form.component';
import { OrderPageComponent } from './modules/user/order-page/order-page.component';
import { MyAccountPageComponent } from './modules/user/my-account-page/my-account-page.component';
import { UserInfoComponent } from './modules/user/my-account/user-info/user-info.component';
import { SharedService } from './_shared/constant/share-service';
import { StaffDetailFormComponent } from './modules/admin/staff/staff-detail-form/staff-detail-form.component';
import { ShopsListComponent } from './modules/admin/shops/shops-list/shops-list.component';
import { ShopsFormComponent } from './modules/admin/shops/shops-form/shops-form.component';
import { DeliveryAddressComponent } from './modules/user/my-account/delivery-address/delivery-address.component';
import { ChangePasswordComponent } from './modules/user/my-account/change-password/change-password.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NavbarComponent,
    SidebarComponent,
    ProductsListComponent,
    BodyComponent,
    SearchProductComponent,
    ProductFormComponent,
    LogproductFormComponent,
    HomePageComponent,
    BodyUserComponent,
    NavbarUserComponent,
    HeaderUserComponent,
    ProductPageComponent,
    LoginPageComponent,
    RegisterPageComponent,
    NoAccessComponent,
    VerificationComponent,
    NotFoundComponent,
    ContactPageComponent,
    FooterUserComponent,
    CategoriesListComponent,
    CustomersListComponent,
    StaffListComponent,
    CategoriesFormComponent,
    PromotionsListComponent,
    OrdersListComponent,
    ProductDetailComponent,
    FooterComponent,
    ConfirmFormComponent,
    ProductDetailPageComponent,
    StaffFormComponent,
    PromotionFormComponent,
    StaffFormComponent,
    StaffAddFormComponent,
    OrdersProcessListComponent,
    OrdersApprovalListComponent,
    OrdersDeliveryListComponent,
    OrdersCompletedListComponent,
    OrdersCancelledListComponent,
    OrdersReturnListComponent,
    OrdersDetailComponent,
    DeliveryListComponent,
    CartPageComponent,
    DeliveryListComponent,
    CartPageComponent,
    ProductAddCartFormComponent,
    OrderPageComponent,
    MyAccountPageComponent,
    UserInfoComponent,
    OrderPageComponent,
    StaffDetailFormComponent,
    ShopsListComponent,
    ShopsFormComponent,
    DeliveryAddressComponent,
    ChangePasswordComponent
  ],
  entryComponents: [
    ProductFormComponent,
    LogproductFormComponent,
    CategoriesFormComponent,
    ConfirmFormComponent,
    PromotionFormComponent,
    StaffFormComponent,
    ProductAddCartFormComponent,
    StaffAddFormComponent,
    StaffDetailFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule, 
    BrowserAnimationsModule
  ],
  exports: [
 ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
