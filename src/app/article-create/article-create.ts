import { Component } from '@angular/core';
import { Article } from '../common/article.interface';
import { ArticlesService } from '../common/articles-service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-create',
  imports: [],
  templateUrl: './article-create.html',
  styleUrl: './article-create.css',
})
export class ArticleCreate {
  article: Article = {
    title: '',
    body: '',
    userId: 0,
  };

  constructor(private articleService: ArticlesService) {}

  createArticle(): void {
    this.articleService
      .createArticle(this.article)
      .subscribe
      // to be completed
      ();
  }
}
