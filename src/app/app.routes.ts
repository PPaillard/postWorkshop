import { Routes } from '@angular/router';
import { PostDetails } from './post-details/post-details';
import { PostList } from './post-list/post-list';

export const routes: Routes = [
  { path: '', component: PostList },
  { path: 'posts/:id', component: PostDetails },
  { path: '**', redirectTo: '' },
];
