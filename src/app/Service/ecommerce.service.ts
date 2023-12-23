import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EcommerceService {
  path: any = 'https://freeapi.miniprojectideas.com/api/amazon/';
  cartUpdates: Subject<boolean> = new Subject<boolean>();
  constructor(
    private Http: HttpClient
  ) { }

  GetAllProducts(): Observable<any> {
    return this.Http.get<any>(this.path + 'GetAllProducts');
  }

  GetAllCategory(): Observable<any> {
    return this.Http.get<any>(this.path + 'GetAllCategory');
  }

  GetAllProductsByCategoryId(categoryId: any): Observable<any> {
    return this.Http.get<any>(this.path + 'GetAllProductsByCategoryId?id=' + categoryId)
  }

  registerCustomer(Obj: any): Observable<any> {
    return this.Http.post<any>(this.path + 'RegisterCustomer', Obj);
  }

  loginCustomer(Obj: any): Observable<any> {
    return this.Http.post<any>(this.path + 'Login', Obj);
  }

  AddToCart(Obj: any): Observable<any> {
    return this.Http.post<any>(this.path + 'AddToCart', Obj);
  }

  PlaceOrder(Obj: any): Observable<any> {
    return this.Http.post<any>(this.path + 'PlaceOrder', Obj);
  }

  GetCartProductsByCustomerId(Id: any): Observable<any> {
    return this.Http.get<any>(this.path + 'GetCartProductsByCustomerId?id=' + Id)
  }

  DeleteProductFromCartById(Id: any): Observable<any> {
    return this.Http.get<any>(this.path + 'DeleteProductFromCartById?id=' + Id)
  }
}
