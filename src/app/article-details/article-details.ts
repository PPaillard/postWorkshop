import { Component } from '@angular/core';
import { Article } from '../common/article.interface';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { ArticlesService } from '../common/articles-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-details',
  imports: [RouterLink],
  templateUrl: './article-details.html',
  styleUrl: './article-details.css',
})
export class ArticleDetails {
  constructor(
    private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private toastr: ToastrService
  ) {}

  loading = false;
  article: Article | null = null;

  ngOnInit(): void {
    console.log('init article details');
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = Number(params.get('id'));
      if (!id) {
        this.toastr.error('Identifiant invalide.');
        this.article = null;
        return;
      }
      this.fetchArticle(id);
    });
  }

  private fetchArticle(id: number): void {
    this.loading = true;
    this.article = null;
    this.articlesService.getArticle(id).subscribe({
      next: (p) => {
        this.article = p;
        this.loading = false;
      },
      error: () => {
        this.toastr.error('Impossible de charger le article.');
        this.loading = false;
      },
    });
  }
}
