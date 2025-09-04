import { Component } from '@angular/core';
import { Article } from '../common/article.interface';
import { ArticlesService } from '../common/articles-service';
import { ActivatedRoute, ParamMap, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-article-form',
  imports: [FormsModule, RouterLink],
  templateUrl: './article-form.html',
  styleUrl: './article-form.css',
})
export class ArticleForm {
  article: Article = {
    title: '',
    body: '',
    userId: 0,
  };

  isEditing: boolean = false;

  constructor(
    private articleService: ArticlesService,
    private toastr: ToastrService,
    private routeur: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // je récupère le service qui me donne accès au param de l'url
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      // dans la liste de mes param, je vais récupèrer l'id et je le converti en number (de base, c'est un string)
      const id = Number(params.get('id'));
      // Si l'id existe
      if (id) {
        this.isEditing = true;
        // je récup l'article correspondant
        this.articleService.getArticle(id).subscribe({
          next: (article) => {
            this.article = article;
          },
          error: () => {
            this.toastr.error('Article impossible à récupèrer');
            // on redirige vers la liste des articles
            this.routeur.navigate(['/']);
          },
        });
      }
    });
  }

  onSubmit(): void {
    // s'il ya un identifiant, je suis en update
    if (this.article.id) {
      this.updateArticle();
    } else {
      this.createArticle();
    }
  }

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

  updateArticle(): void {
    this.articleService.updateArticle(this.article.id!, this.article).subscribe({
      next: () => {
        // On prévient l'utilisateur
        this.toastr.success('Article bien modifié !');
        // on redirige vers la liste des articles
        this.routeur.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        // TODO : gérer les différentes erreurs
        // Si erreur de backend (500), on a juste à dire à l'utilisateur qu'il ya un pépin, on ne peut pas accéder à sa demande.
        // On peut avoir un problème de validation des données cotés serveur
        this.toastr.error("Erreur durant la modification de l'article");
        this.routeur.navigate(['/']);
      },
    });
  }
}
