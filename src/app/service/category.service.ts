import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http : HttpClient) { }

  getAllCategory(): Observable<any> {
    return this.http.get('https://localhost:44316/api/Categories')
  }

  addCategory(data:any): Observable<any> {
    return this.http.post('https://localhost:44316/api/Categories',data)
  }

  updateCategory(data:any): Observable<any> {
    return this.http.put(`https://localhost:44316/api/Categories/${data.categoryID}`,data)
  }

  deleteCategory(id:any): Observable<any> {
    return this.http.delete(`https://localhost:44316/api/Categories/${id}`)
  }
}
