import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as jwtDecode from 'jwt-decode';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';
import { User, UserPayload } from '../models/user.model';
import Token from '../models/token.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  userUrl = `${environment.apiUrl}/user`;
  currentUser = new Subject<User>();
  isLoggedIn = new Subject<boolean>();
  private token: string;

  constructor(
    private http: HttpClient
  ) { }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }

    return this.token;
  }

  private deleteToken(): void {
    this.token = '';
    localStorage.removeItem('token');
  }

  public setCurrentUser(): void {
    const token = this.getToken();

    if (token) {
      this.currentUser.next(jwtDecode<User>(token));
    } else {
      this.currentUser.next(null);
    }

    this.setIsLoggedIn();
  }

  private setIsLoggedIn(): void {
    const token = this.getToken();

    if (!token) {
      this.isLoggedIn.next(false);
      return;
    }

    const user = jwtDecode<User>(token);

    this.isLoggedIn.next(user.exp > Date.now() / 1000);
  }

  public getIsAdmin(): boolean {
    const token = this.getToken();

    if (!token) {
      return false;
    }

    const user = jwtDecode<User>(token);

    return user.admin;
  }

  public register(user: UserPayload): Observable<any> {
    return this.http
      .post(`${this.userUrl}/signup`, { data: user })
      .map(({ token }: Token) => {
        this.setToken(token);
        this.setCurrentUser();
      });
  }

  public login(user: UserPayload): Observable<any> {
    return this.http
      .post(`${this.userUrl}/login`, user)
      .map(({ token }: Token) => {
        this.setToken(token);
        this.setCurrentUser();
      });
  }

  public editUser(id: string, user: User): Observable<User> {
    return this.http
      .put<User>(`${this.userUrl}/change-password/${id}`, { data: user });
  }

  public logout(): void {
    this.deleteToken();
    this.setCurrentUser();
  }
}
