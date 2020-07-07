import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { ProductListComponent } from './product-list/product-list.component';
import { SingleProductComponent } from './product-list/single-product/single-product.component';
import { ProductFormComponent } from './product-list/product-form/product-form.component';
import { HeaderComponent } from './header/header.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductsService } from './services/products.service';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';

const appRoutes:Routes=[
  {path:'auth/signup',component: SignupComponent},
  {path:'auth/signin',component: SigninComponent},
  {path:'products', canActivate: [AuthGuardService],component: ProductListComponent},
  {path:'products/new', canActivate: [AuthGuardService],component: ProductFormComponent},
  {path:'products/view/:id', canActivate: [AuthGuardService],component: SingleProductComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    ProductListComponent,
    SingleProductComponent,
    ProductFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
