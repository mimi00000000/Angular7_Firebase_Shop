import { AppUser } from './models/app-user';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFirestore) { }

  save(user: firebase.User) {
    this.db.doc(`users/${user.uid}`).set({
        name: user.displayName,
        email: user.email
    }, { merge: true })
      .then( () => {
        console.log('Document successfully written!');
      })
      .catch( (error) => {
        console.error('!!!!!!!!!!!Error writing document: ', error);
      });
  }

  get(uid: string): AngularFirestoreDocument<AppUser> {
    return this.db.doc('users/' + uid);
  }

}
