import { VisualizarFilmesComponent } from './filmes/visualizar-filmes/visualizar-filmes.component';
import { FilmesModule } from './filmes/filmes.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListagemFilmesComponent } from './filmes/listagem-filmes/listagem-filmes.component';
import { CadastroFilmesComponent } from './filmes/cadastro-filmes/cadastro-filmes.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'filmes',
    pathMatch: 'full'
  },
  {
    path: 'filmes',
    children: [
      {
        path: '',
        component: ListagemFilmesComponent
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroFilmesComponent
          },
          {
            path: ':id',
            component: CadastroFilmesComponent
          }
        ]
      },
      {
        path: ':id',
        component: VisualizarFilmesComponent
      },
    ]
  },
  { path: '**', redirectTo: 'filmes' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  FilmesModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
