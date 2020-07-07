import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product.models';
import * as firebase from 'firebase';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  constructor(private formBuilder: FormBuilder, private productsService:ProductsService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.productForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      file:['',Validators.required]
    });
  }
  onSaveProduct() {
    const titre = this.productForm.get('title').value;
    const author = this.productForm.get('author').value;
    const photo = this.productForm.get('file').value;
    const newBook = new Product(titre,author,photo);
    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }
    this.productsService.createNewProduct(titre,author,photo);
    this.router.navigate(['/products']);
  }
  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.productsService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
}
detectFiles(event) {
  this.onUploadFile(event.target.files[0]);
}
removeProduct(product: Product) {
  if(product.photo) {
    const storageRef = firebase.storage().refFromURL(product.photo);
    storageRef.delete().then(
      () => {
        console.log('Photo removed!');
      },
      (error) => {
        console.log('Could not remove photo! : ' + error);
      }
    );
  }
  


}


}
