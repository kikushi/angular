import { Injectable } from '@angular/core';
import { Product } from '../models/product.models';
import { Subject } from 'rxjs/Subject';
import *as firebase from 'firebase';
import { resolve } from 'dns';
import { rejects } from 'assert';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  products:Product[]=[];
  
  
  productsSubjet = new Subject<Product[]>();



  constructor() { this.getProducts()
  var url}
  emitProducts(){
    this.productsSubjet.next(this.products);
  }
  saveProduct(title,author,photo){
    firebase.firestore().collection("speciaux").add({
      title: title,
      author: author,
      photo:photo,
  })
  .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
  }
  getProducts(){
    var storage = firebase.storage();
    var storageRef = storage.ref();
    var tangRef = storageRef.child('images');
    const product = [];
    const productimage=[];
    firebase.firestore().collection("speciaux").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
          // doc.data() is never undefined for query doc snapshots
          var fruit =[doc.id,doc.data()];
          //console.log(doc.id, " => ", (doc.data()["photo"]).substring(12,));
          var image = tangRef.child((doc.data()["photo"]).substring(12,))
          var image_link
          image.getDownloadURL().then(function(url)                             {
            // Once we have the download URL, we set it to our img element
            image_link=url;
           // console.log(doc.id, " => ",image_link)
            productimage.push(image_link)
            var fruit2=[fruit,image_link]
            product.push(fruit2)
           
           // this.image_link=image_link;
          })
          console.log(doc.id, " ==============> ",product)
             
      });
      //product.push(fruit)
      
      
  });
  console.log("2xx==============> ",product)
  tangRef.getDownloadURL().then(function(url)                             {
    // Once we have the download URL, we set it to our img element
    document.querySelector('img').src = url;

  }).catch(function(error) {
    // If anything goes wrong while getting the download URL, log the error
    console.error(error);
  });

  this.products=product;

  }
  getSingleProduct(id){
    return new Promise((resolve,reject)=>{
      firebase.firestore().collection("speciaux").doc("b8TgLMpFozEJOZI9W0cP").get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!",id.toString());
        }
    })
    })
  }
  createNewProduct(title:string,author:string,photo:string){
    var pro=[""];
    pro.push(title);
    pro.push(author);
    pro.push(photo);
    
    this.products.push(new Product(title,author,photo));
    this.saveProduct(title,author,photo);
    this.emitProducts();
  }
  removeProduct(product:Product){
    const productIndex = this.products.findIndex((productEl)=>{
      if(productEl===product){return true;}
    });
    console.log("Document data deleteddddd:", this.products[0][0]);
    firebase.firestore().collection("speciaux").doc(this.products[0][0][0]).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
    this.products.splice(productIndex,1);

    //console.log("Document data deleteddddd:", this.products[productIndex]);
    this.emitProducts();


  }
  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement…');
          },
          (error) => {
            console.log('Erreur de chargement ! : ' + error);
            reject();
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
            console.log(upload.snapshot.ref.getDownloadURL());
            

          }
        );
      }
    );
}

}
