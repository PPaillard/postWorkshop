import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from './article.interface';

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  private baseUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/posts`);
  }

  getArticle(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/posts/${id}`);
  }

  createArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.baseUrl}/posts`, article);
  }

  updateArticle(id: number, article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.baseUrl}/posts/${id}`, article);
  }

  deleteArticle(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/posts/${id}`);
  }
}
