import { Product } from "./products";
import { ShoppingCartItem } from "./shopping-cart-item";
export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  getQuantity(product: Product) {
    return 1;
  }
}
