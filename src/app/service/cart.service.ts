import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private totalQuantitySubject = new BehaviorSubject<number>(0); // BehaviorSubject để theo dõi số lượng sản phẩm trong giỏ hàng

  // Observable để theo dõi số lượng sản phẩm trong giỏ hàng từ header.component
  totalQuantity$ = this.totalQuantitySubject.asObservable();  
  constructor() { }

  updateTotalQuantity(data:any) {
    console.log(data);
    
    this.totalQuantitySubject.next(data);
  }

  getSessionCart (): any {
    let cartJSon = sessionStorage.getItem('cart')
    console.log('CARTJSON :' + cartJSon)
    if(cartJSon)
    {
      return  JSON.parse(cartJSon)
    }
    else {
      return [];
    }
  }

  getSessionTotalQuantity (): any {
    let cartJSon = sessionStorage.getItem('totalQuantity')
    console.log('CARTJSON :' + cartJSon)
    if(cartJSon)
    {
      return  JSON.parse(cartJSon)
    }
    else {
      return 0;
    }
  }
}
