import { Component } from '@angular/core';
import { Article } from '../common/article.interface';
import { ArticlesService } from '../common/articles-service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-create',
  imports: [FormsModule],
  templateUrl: './article-create.html',
  styleUrl: './article-create.css',
})
export class ArticleCreate {
  article: Article = {
    title: '',
    body: '',
    userId: 0,
  };

  constructor(
    private articleService: ArticlesService,
    private toastr: ToastrService,
    private routeur: Router
  ) {}

  createArticle(): void {
    this.articleService.createArticle(this.article).subscribe({
      next: () => {
        // On prévient l'utilisateur
        this.toastr.success('Article bien ajouté !');
        // on redirige vers la liste des articles
        this.routeur.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        // TODO : gérer les différentes erreurs
        // Si erreur de backend (500), on a juste à dire à l'utilisateur qu'il ya un pépin, on ne peut pas accéder à sa demande.
        // On peut avoir un problème de validation des données cotés serveur
        this.toastr.error("Erreur durant la création de l'article");
        this.routeur.navigate(['/']);
      },
    });
  }
}
