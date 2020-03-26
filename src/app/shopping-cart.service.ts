import { ShoppingCart } from "./models/shopping-cart";
import { Product } from "src/app/models/products";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import "rxjs/add/operator/take";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFirestore) {}

  private create() {
    return this.db.collection("shoppingcarts").add({
      dateCreated: new Date().getTime()
    });
  }

  async getCart() {
    const cartId = await this.getOrCreateCartId();
    return this.db.doc("shoppingcarts/" + cartId).valueChanges();
  }

  async getItems() {
    const cartId = await this.getOrCreateCartId();
    return this.db
      .doc("shoppingcarts/" + cartId)
      .collection("items")
      .valueChanges();
  }

  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    }
    const result = await this.create();
    localStorage.setItem("cartId", result.id);
    return result.id;
  }

  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    this.getItem(cartId, product.key).subscribe(doc => {
      if (doc.exists) {
        doc.ref.update({ quantity: doc.data().quantity + 1 });
        console.log(doc.data().quantity);
      } else {
        doc.ref.set({
          product: product.key,
          quantity: 1
        });
        console.log("Document successfully written!");
      }
    });
    console.log(product.key + " " + cartId);
  }

  async removeFromCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    this.getItem(cartId, product.key).subscribe(doc => {
      if (doc.exists) {
        doc.ref.update({ quantity: doc.data().quantity - 1 });
        console.log(doc.data().quantity);
      } else {
        doc.ref.set({
          product: product.key,
          quantity: 0
        });
        console.log("Document successfully written!");
      }
    });
    console.log(product.key + " " + cartId);
  }

  private getItem(cartId: string, productId: string) {
    return this.db.doc("shoppingcarts/" + cartId + "/items/" + productId).get();
  }
}
