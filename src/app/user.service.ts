import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.collection('users').add({
        name: user.displayName,
        email: user.email
    })
      .then( () => {
        console.log('Document successfully written!');
      })
      .catch( (error) => {
        console.error('!!!!!!!!!!!Error writing document: ', error);
      });
  }

}
