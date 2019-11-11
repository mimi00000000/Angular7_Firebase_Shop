import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private db: AngularFirestore) { }

  create(product) {
    return this.db.collection('products').add(product)
      .then(() => {
        console.log('Document successfully written!');
      })
      .catch((error) => {
        console.error('!!!!!!!!!!!Error writing document: ', error);
      });
  }


  getAll() {
    return this.db.collection('products').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
    });
  }

  get(productId) {
    return this.db.doc('products/' + productId).valueChanges();
  }


  update(productId, product) {
     return this.db.doc(`products/${productId}`).set({
       imageUrl: product.imageUrl,
       price: product.price,
       title: product.title,
       category: product.category
      }, { merge: true })
      .then(() => {
        console.log('Product updated successfully!');
      })
      .catch((error) => {
        console.error('!!!!!!!!!!!Error while updating the product', error);
      });
  }

}
