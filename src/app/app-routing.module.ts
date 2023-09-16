import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentComponent } from './content/content.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { BookmanagerComponent } from './bookmanager/bookmanager.component';
import { CategorymanagerComponent } from './categorymanager/categorymanager.component';
import { PaymentComponent } from './payment/payment.component';
import { BillmanagerComponent } from './billmanager/billmanager.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'home', component: ContentComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'cart', component: CartComponent },
  { path: 'categoryManager', component: CategorymanagerComponent },
  { path: 'bookManager', component: BookmanagerComponent },
  { path: 'billManager', component: BillmanagerComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'search/:name', component: SearchComponent },


  // Define more routes here
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
