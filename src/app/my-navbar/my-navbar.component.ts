import { ShoppingCartService } from "./../shopping-cart.service";
import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { AppUser } from "../models/app-user";

@Component({
  selector: "app-my-navbar",
  templateUrl: "./my-navbar.component.html",
  styleUrls: ["./my-navbar.component.css"]
})
export class MyNavbarComponent implements OnInit {
  appUser: AppUser;
  shoppingCartNumber: number;

  constructor(
    private auth: AuthService,
    private shoppingCartService: ShoppingCartService
  ) {}
  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser => (this.appUser = appUser));
    const cart = await this.shoppingCartService.getItems();
    // tslint:disable-next-line:no-shadowed-variable
    cart.subscribe(doc => {
      console.log(doc);
      this.shoppingCartNumber = doc.size;
    });
  }

  logout() {
    this.auth.logout();
  }
}
