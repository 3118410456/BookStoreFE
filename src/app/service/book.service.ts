import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }


  getCategory(): Observable<any> {
    return this.http.get<any[]>('https://localhost:44316/api/Categories')
    // console.log(response)
  }

  addNewBook(data:any): Observable<any> {
    return this.http.post<any[]>('https://localhost:44316/api/Books' , data)
  }

  getAllBooks(): Observable<any> {
    return this.http.get<any[]>('https://localhost:44316/api/Books')
  }

  updateBook(data:any): Observable<any> {
    return this.http.put<any[]>(`https://localhost:44316/api/Books/${data.bookID}` , data)
  }

  getBookByID(id:any): Observable<any> {
    return this.http.get<any[]>(`https://localhost:44316/api/Books/${id}`)
  }

  getBookByCategoryID(id:any): Observable<any> {
    return this.http.get<any[]>(`https://localhost:44316/api/Books/Category/${id}`)
  }



  

}
