import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { SearchComponent } from './components/search/search.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:"home", component:HomeComponent},
  {path: "products", component:ProductsComponent},
  {path: "cart", component:CartComponent},
  {path: '', component:LandingPageComponent},
  {path: 'checkout', component:CheckoutComponent},
  {path: 'search', component:SearchComponent},
  {path: "product-detail/:id", component:ProductDetailComponent},
  {path: "product-detail", component: ProductDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
