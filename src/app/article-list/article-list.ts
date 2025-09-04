import { Component } from '@angular/core';
import { Article } from '../common/article.interface';
import { ArticlesService } from '../common/articles-service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-list',
  imports: [RouterLink],
  templateUrl: './article-list.html',
  styleUrl: './article-list.css',
})
export class ArticleList {
  articles!: Article[];
  errorMessage = '';
  // tableau contenant les identifiants des articles supprimés
  deletedArticles: number[] = [];

  constructor(private articlesService: ArticlesService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.articlesService.getArticles().subscribe({
      next: (data) => (this.articles = data),
      error: (err) => {
        this.toastr.error('Erreur serveur');
      },
    });
  }

  /* 
  Pour supprimer : 
  -Appelle d'une fonction avec l'identifiant de l'article.
  -Confirmation de l'utilisateur?
    Si oui : 
      -On appelle la fonction supprimer dans le service
      -On averti l'utilisateur de la réalisation de l'opération
    Si non :
      RIEN 
  */

  deleteArticle(id: number): void {
    if (confirm('Confirmez vous la suppression?')) {
      this.articlesService.deleteArticle(id).subscribe({
        next: () => {
          // On ajoute l'identifiant de larticle à la liste des articles supprimés
          this.deletedArticles.push(id);
          this.toastr.success('La suppression a été effectué');
        },
        error: () => {
          this.toastr.error("Erreur durant la suppression de l'article.");
        },
      });
    }
  }
}
