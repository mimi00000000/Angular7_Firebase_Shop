import { Product } from "./models/products";
import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

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

  private getCart(cartId: string) {
    return this.db.doc("shoppingcarts/" + cartId).valueChanges();
  }

  private async getOrCreateCartId() {
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
    return this.db.doc(`shoppingcarts/${cartId}+ /items/${product.id}`);
  }
}
