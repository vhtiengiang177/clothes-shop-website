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
import { AuthAppService } from './services/auth/auth.service';
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
import { OrdersProcessListComponent } from './modules/admin/orders/orders-process-list/orders-process-list.component';
import { OrdersApprovalListComponent } from './modules/admin/orders/orders-approval-list/orders-approval-list.component';
import { OrdersDeliveryListComponent } from './modules/admin/orders/orders-delivery-list/orders-delivery-list.component';
import { OrdersCompletedListComponent } from './modules/admin/orders/orders-completed-list/orders-completed-list.component';
import { OrdersCancelledListComponent } from './modules/admin/orders/orders-cancelled-list/orders-cancelled-list.component';
import { OrdersReturnListComponent } from './modules/admin/orders/orders-return-list/orders-return-list.component';
import { ProductDetailPageComponent } from './modules/user/product-detail-page/product-detail-page.component';
import { CartPageComponent } from './modules/user/cart-page/cart-page.component';
import { ProductAddCartFormComponent } from './modules/user/product-add-cart-form/product-add-cart-form.component';
import { OrderPageComponent } from './modules/user/order-page/order-page.component';
import { MyAccountPageComponent } from './modules/user/my-account-page/my-account-page.component';
import { UserInfoComponent } from './modules/user/my-account/user-info/user-info.component';
import { StaffDetailFormComponent } from './modules/admin/staff/staff-detail-form/staff-detail-form.component';
import { ShopsListComponent } from './modules/admin/shops/shops-list/shops-list.component';
import { ShopsFormComponent } from './modules/admin/shops/shops-form/shops-form.component';
import { PromotionDetailComponent } from './modules/admin/promotions/promotion-detail/promotion-detail.component';
import { DeliveryAddressComponent } from './modules/user/my-account/delivery-address/delivery-address.component';
import { ChangePasswordComponent } from './modules/user/my-account/change-password/change-password.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { DeliveryAddressFormComponent } from './modules/user/my-account/delivery-address-form/delivery-address-form.component';
import { PromotionPageComponent } from './modules/user/promotion-page/promotion-page.component';
import { ImagesProductFormComponent } from './modules/admin/products/images-product-form/images-product-form.component';
import { OrdersDetailFormComponent } from './modules/admin/orders/orders-detail-form/orders-detail-form/orders-detail-form.component';
import { OrdersPickupListComponent } from './modules/admin/orders/orders-pickup-list/orders-pickup-list.component';
import { NgChartsModule, ThemeService } from 'ng2-charts';
import { ChartTopProductComponent } from './modules/admin/charts/chart-top-product/chart-top-product.component';
import { OrdersHistoryPageComponent } from './modules/user/orders-history-page/orders-history-page.component';
import { OrdersApprovalComponent } from './modules/user/orders-history/orders-approval/orders-approval.component';
import { OrdersDeliveryComponent } from './modules/user/orders-history/orders-delivery/orders-delivery.component';
import { OrdersCompletedComponent } from './modules/user/orders-history/orders-completed/orders-completed.component';
import { OrdersCancelledComponent } from './modules/user/orders-history/orders-cancelled/orders-cancelled.component';
import { OrdersReturnComponent } from './modules/user/orders-history/orders-return/orders-return.component';
import { OrdersProcessComponent } from './modules/user/orders-history/orders-process/orders-process.component';
import { ChartTotalAmountComponent } from './modules/admin/charts/chart-total-amount/chart-total-amount.component';
import { OrderDetailUserFormComponent } from './modules/user/orders-history/order-detail-user-form/order-detail-user-form.component';
import { AuthServiceConfig, GoogleLoginProvider, SocialLoginModule } from 'angularx-social-login';
import { ChartTotalOrdersComponent } from './modules/admin/charts/chart-total-orders/chart-total-orders.component';
import { AboutUsPageComponent } from './modules/user/about-us-page/about-us-page/about-us-page.component';
import { ForgotPasswordPageComponent } from './modules/authentication/forgot-password-page/forgot-password-page.component';
import { ResetPasswordPageComponent } from './modules/authentication/reset-password-page/reset-password-page.component';
import { CustomerDetailFormComponent } from './modules/admin/customers/customer-detail-form/customer-detail-form.component';
import { PromotionProductComponent } from './modules/admin/promotions/promotion-product/promotion-product.component';
import { SearchProductPromotionComponent } from './modules/admin/promotions/search-product-promotion/search-product-promotion.component';
import { FavoriteComponent } from './modules/user/my-account/favorite/favorite.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReviewPageComponent } from './modules/user/review-page/review-page/review-page.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { OrderPaymentFormComponent } from './modules/user/order-payment-form/order-payment-form.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
 
 
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("939694652913-p6h9011mt29v2c7agtj7f4m8618mo74j.apps.googleusercontent.com")
  }
]);
 
export function provideConfig() {
  return config;
}


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
    OrdersProcessListComponent,
    OrdersApprovalListComponent,
    OrdersDeliveryListComponent,
    OrdersCompletedListComponent,
    OrdersCancelledListComponent,
    OrdersReturnListComponent,
    CartPageComponent,
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
    ChangePasswordComponent,
    ShopsFormComponent,
    PromotionDetailComponent,
    DeliveryAddressFormComponent,
    PromotionPageComponent,
    ImagesProductFormComponent,
    OrdersDetailFormComponent,
    OrdersPickupListComponent,
    ChartTopProductComponent,
    OrdersHistoryPageComponent,
    OrdersApprovalComponent,
    OrdersDeliveryComponent,
    OrdersCompletedComponent,
    OrdersCancelledComponent,
    OrdersReturnComponent,
    OrdersProcessComponent,
    OrderDetailUserFormComponent,
    ChartTotalAmountComponent,
    ChartTotalOrdersComponent,
    AboutUsPageComponent,
    ForgotPasswordPageComponent,
    ResetPasswordPageComponent,
    CustomerDetailFormComponent,
    PromotionProductComponent,
    SearchProductPromotionComponent,
    FavoriteComponent,
    ReviewPageComponent,
    OrderPaymentFormComponent
  ],
  entryComponents: [
    ProductFormComponent,
    LogproductFormComponent,
    CategoriesFormComponent,
    ConfirmFormComponent,
    PromotionFormComponent,
    StaffFormComponent,
    ProductAddCartFormComponent,
    StaffDetailFormComponent,
    PromotionDetailComponent,
    DeliveryAddressFormComponent,
    ImagesProductFormComponent,
    OrdersDetailFormComponent,
    OrderDetailUserFormComponent,
    CustomerDetailFormComponent,
    ReviewPageComponent,
    OrderPaymentFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    AngularFontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    BrowserAnimationsModule,
    BrowserModule, 
    IvyCarouselModule,
    NgChartsModule,
    SocialLoginModule,
    InfiniteScrollModule,
    MatCheckboxModule, 
    NgxSliderModule
  ],
  exports: [

  ],
  providers: [
    AuthAppService,
    ThemeService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
