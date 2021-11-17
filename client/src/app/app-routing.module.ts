import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './modules/admin/dashboard/dashboard.component';
import { ProductsListComponent } from './modules/admin/products/products-list/products-list.component';
import { HomePageComponent } from './modules/user/home-page/home-page.component';
import { BodyUserComponent } from './modules/user/layout/body-user/body-user.component';


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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
