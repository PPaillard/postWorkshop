import { Component } from '@angular/core';
import { Post } from '../common/post.interface';
import { PostsService } from '../common/posts-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-create',
  imports: [],
  templateUrl: './post-create.html',
  styleUrl: './post-create.css',
})
export class PostCreate {
  post: Post = {
    title: '',
    body: '',
    userId: 0,
  };

  constructor(private postService: PostsService) {}

  createPost(): void {
    this.postService
      .createPost(this.post)
      .subscribe
      // to be completed
      ();
  }
}
