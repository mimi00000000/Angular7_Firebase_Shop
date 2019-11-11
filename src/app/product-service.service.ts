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

}
