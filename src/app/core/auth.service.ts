import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly access_token = "access_token";
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  
  constructor(private http: HttpClient) {
  }
     
  login(UserName: string, Password: string) {
    let body = new URLSearchParams();
    body.set("UserName", UserName);
    body.set("Password", Password);
    body.set("grant_type", "password")

    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    }

    return this.http.post('https://localhost:44366/token', body.toString(), options).pipe(
      tap((res:any) => this.doLoginUser(UserName, res.access_token))
    )
  }

  doLoginUser(username:string, token: any) {
    this.loggedUser = username;
    this.storeToken(token);
    this.isAuthenticatedSubject.next(true);
  }

  storeToken(token: string) {
    localStorage.setItem(this.access_token, token);
  }

  logout() {
    localStorage.removeItem(this.access_token);
    this.isAuthenticatedSubject.next(false);
  }

  getProducts() {
    // should use injector but short on time
    let token = localStorage.getItem("access_token");
    return this.http.get('https://localhost:44366/api/values', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteProduct(id: number) {
    // should use injector but short on time
    let token = localStorage.getItem("access_token");
    return this.http.delete(`https://localhost:44366/api/values/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  addProduct(productName: string, productDescription: string) {
    // should use injector but short on time
    let token = localStorage.getItem("access_token");
    return this.http.post(`https://localhost:44366/api/values`, {
      ProductName: productName, 
      ProductDescription: productDescription
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  updateProduct(ID: number, productName: string, productDescription: string) {
    
    // should use injector but short on time
    let token = localStorage.getItem("access_token");
    return this.http.put(`https://localhost:44366/api/values/${ID}`, {
      ID: ID, 
      ProductName: productName, 
      ProductDescription: productDescription
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
  
}
