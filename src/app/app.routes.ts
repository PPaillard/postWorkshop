import { Routes } from '@angular/router';
import { PostDetails } from './post-details/post-details';
import { PostList } from './post-list/post-list';
import { PostCreate } from './post-create/post-create';

export const routes: Routes = [
  { path: '', component: PostList },
  { path: 'posts/create', component: PostCreate },
  { path: 'posts/:id', component: PostDetails },
  { path: '**', redirectTo: '' },
];
