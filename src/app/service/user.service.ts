import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  addNewUser(data:any): Observable<any> {
    return this.http.post<any[]>('https://localhost:44316/api/Users' , data)
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any[]>('https://localhost:44316/api/Users')
  }

  updateBook(data:any): Observable<any> {
    return this.http.put<any[]>(`https://localhost:44316/api/Books/${data.userID}` , data)
  }
}
