import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private http:HttpClient) { }

  getBills(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:44316/api/Bills');
  }

  getBillDetailByID(id: any): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:44316/api/BillDetails/${id}`);
  }

  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:44316/api/Books`);
  }
}
