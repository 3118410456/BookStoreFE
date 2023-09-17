import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContentComponent } from './content/content.component';
import { HttpClientModule } from '@angular/common/http';
import { DxButtonModule, DxDataGridModule, DxFormModule } from 'devextreme-angular';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CategoryComponent } from './category/category.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookmanagerComponent } from './bookmanager/bookmanager.component';
import { CategorymanagerComponent } from './categorymanager/categorymanager.component';
import { BillmanagerComponent } from './billmanager/billmanager.component';
import { PaymentComponent } from './payment/payment.component';
import { DatePipe } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { FilterPipe } from './filter.pipe';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    AboutComponent,
    LoginComponent,
    ProductDetailComponent,
    CategoryComponent,
    ContactComponent,
    CartComponent,
    BookmanagerComponent,
    CategorymanagerComponent,
    BillmanagerComponent,
    PaymentComponent,
    SearchComponent,
    FilterPipe,
    RegisterComponent,
    

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
