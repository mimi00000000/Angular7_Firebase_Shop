import { UserService } from './user.service';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private userService: UserService, private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router) {
    this.user$ = afAuth.authState;
  }


  login() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }


  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['login']);
    });
  }


  get appUser$(): Observable<AppUser> {
    return this.user$.switchMap(user => {
      if (user) {
        return this.userService.get(user.uid).valueChanges();
      }
      return of(null);
    });
  }

}
