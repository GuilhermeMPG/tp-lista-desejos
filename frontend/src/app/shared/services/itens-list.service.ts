import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { itens_List, itens_List_back } from '../models/itens_lista.model';
@Injectable({
  providedIn: 'root',
})
export class ItensListService {
  baseURL = 'item_desejo';

  constructor(private http: HttpClient) {}

  getAll(): Observable<itens_List_back[]> {
    return this.http.get<itens_List_back[]>(this.baseURL);
  }
  getItem(id: number): Observable<itens_List_back> {
    return this.http.get<itens_List_back>(`${this.baseURL}/${id}`);
  }
  postIten(item: itens_List_back): Observable<itens_List_back> {
    return this.http.post<itens_List_back>(this.baseURL, item);
  }
  deletIten(id: number): Observable<itens_List_back> {
    return this.http.delete<itens_List_back>(`${this.baseURL}/${id}`);
  }

  update(item: itens_List_back): Observable<itens_List_back> {
    return this.http.patch<itens_List_back>(`${this.baseURL}/${item.id}`, item);
  }
}
