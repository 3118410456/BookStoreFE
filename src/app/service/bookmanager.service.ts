import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookmanagerService {

  constructor(private http: HttpClient) { }


  getCategory(): Observable<any> {
    return this.http.get('https://localhost:44316/api/Categories')
    // console.log(response)
  }

  addNewBook(data:any): Observable<any> {
    return this.http.post('https://localhost:44316/api/Books' , data)
  }

  getAllBooks(): Observable<any> {
    return this.http.get('https://localhost:44316/api/Books')
  }

  updateBook(data:any): Observable<any> {
    return this.http.put(`https://localhost:44316/api/Books/${data.bookID}` , data)
  }

}
