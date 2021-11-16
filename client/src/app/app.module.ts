import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { NavbarComponent } from './modules/admin/layout/navbar/navbar.component';
import { SidebarComponent } from './modules/admin/layout/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsListComponent } from './modules/admin/products/products-list/products-list.component';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from './_shared/components/angular-material/angular-material.module';
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
    HeaderUserComponent
  ],
  entryComponents: [
    ProductFormComponent,
    LogproductFormComponent
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
    BrowserAnimationsModule
    
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
