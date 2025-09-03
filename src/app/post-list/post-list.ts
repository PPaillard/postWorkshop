import { Component } from '@angular/core';
import { Post } from '../common/post.interface';
import { PostsService } from '../common/posts-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-post-list',
  imports: [RouterLink],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  posts!: Post[];
  errorMessage = '';

  constructor(private postsService: PostsService, private toastr:ToastrService) {}

  ngOnInit(): void {
    this.postsService.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => {
         this.toastr.error('Erreur serveur');
      },
    });
  }
}
