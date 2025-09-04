import { Routes } from '@angular/router';
import { ArticleDetails } from './article-details/article-details';
import { ArticleList } from './article-list/article-list';
import { ArticleForm } from './article-form/article-form';

export const routes: Routes = [
  { path: '', component: ArticleList },
  { path: 'articles/create', component: ArticleForm },
  { path: 'articles/:id', component: ArticleDetails },
  { path: 'articles/:id/edit', component: ArticleForm },
  { path: '**', redirectTo: '' },
];
