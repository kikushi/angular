import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.models';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit {
  product:Product;

  constructor(private route: ActivatedRoute, private productsService: ProductsService,
    private router: Router) { }

  ngOnInit(){
    const product = [];
    const id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params['id']);
    this.productsService.getSingleProduct(this.route.snapshot.params['id']).then((product:Product)=>{this.product=product});
    
    
  }
  onBack(){
    this.router.navigate(['/products'])
  }

}
