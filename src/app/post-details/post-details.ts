import { Component } from '@angular/core';
import { Post } from '../common/post.interface';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { PostsService } from '../common/posts-service';

@Component({
  selector: 'app-post-details',
  imports: [RouterLink],
  templateUrl: './post-details.html',
  styleUrl: './post-details.css',
})
export class PostDetails {
  constructor(private route: ActivatedRoute, private postsService: PostsService) {}

  loading = false;
  post: Post | null = null;

  ngOnInit(): void {
    console.log('init post details');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (!id) {
        alert('Identifiant invalide.');
        this.post = null;
        return;
      }
      this.fetchPost(id);
    });
  }

  private fetchPost(id: number): void {
    this.loading = true;
    this.post = null;
    this.postsService.getPost(id).subscribe({
      next: (p) => {
        this.post = p;
        this.loading = false;
      },
      error: () => {
        alert('Impossible de charger le post.');
        this.loading = false;
      },
    });
  }
}
