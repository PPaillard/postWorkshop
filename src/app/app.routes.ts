import { Routes } from '@angular/router';
import { ArticleDetails } from './article-details/article-details';
import { ArticleList } from './article-list/article-list';
import { ArticleCreate } from './article-create/article-create';

export const routes: Routes = [
  { path: '', component: ArticleList },
  { path: 'articles/create', component: ArticleCreate },
  { path: 'articles/:id', component: ArticleDetails },
  { path: '**', redirectTo: '' },
];
