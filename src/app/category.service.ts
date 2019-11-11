import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFirestore) { }

  getCategories() {
    return this.db.collection('categories').snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.doc.id, ...c.payload.doc.data() }));
    });
  }

}

