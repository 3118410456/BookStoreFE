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
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

 
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
    
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    AppRoutingModule,
    DxButtonModule,
    DxDataGridModule,
    DxFormModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
