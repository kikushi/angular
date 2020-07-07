import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product.models';
import { Subscription } from 'rxjs';
import {ProductsService} from 'src/app/services/products.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {
  products:Product[];
  
  producSubscription:Subscription;

  constructor(private productService:ProductsService,private router:Router) { 
    
  }

  ngOnInit(){
    this.producSubscription = this.productService.productsSubjet.subscribe(
      (products:Product[])=>{this.products=products;}

    );
    this.productService.emitProducts();
    this.productService.getProducts();
    
  }
  onNewProduct(){
    this.router.navigate(['/products','new']);
  }
  onDeleteProduct(product:Product){
    this.productService.removeProduct(product);
  }
  onViewProduct(id){
    this.router.navigate(['/products','view',id])
  }
  ngOnDestroy(){
    this.producSubscription.unsubscribe();
  }

}
