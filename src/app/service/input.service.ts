import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InputService {

  constructor() { }

  formatNumber(number: any) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }
}
