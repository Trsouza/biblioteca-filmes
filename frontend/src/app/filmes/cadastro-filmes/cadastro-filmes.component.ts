import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { Filme } from 'src/app/shared/models/filme';
import { Alerta } from 'src/app/shared/models/alerta';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from './../../shared/components/alerta/alerta.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.css']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;
  generos: Array<string>;

  constructor(
    public validacao: ValidarCamposService,
    public filmesService: FilmesService,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.cadastro = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.minLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]]
    });

    this.generos = ['Ação', 'Romance', 'Aventura', 'Terror', 'Ficção cientifica', 'Comédia', 'Aventura', 'Drama'];

  }

  submit(): void {
    this.cadastro.markAllAsTouched();  // Faz parecer que todos os campos foram clicados
    if (this.cadastro.invalid) {
      return;
    }

    const filme = this.cadastro.getRawValue() as Filme;  // retorna os campos que existem dentro do formGroup cadastro
    this.salvar(filme);

  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(() => { // Primeira parte do subscrive é o sucesso
      const config = {
        data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe((opcao: boolean) => {
        if (opcao) { // Verifica qual opção foi clicada no formulario: lisar ou cadastrar filme
          this.router.navigateByUrl('filmes');  //navega para lista de filmes
        } else {
          this.reiniciarForm();
        }
      });
    },
      () => {  // Segunda parte do subscrive é o error
        const config = {
          data: {
            titulo: 'Erro ao salvar o registro!',
            descricao: 'Não conseguimos salvar seu registro, favor tentar novamente mais tarde',
            corBtnSucesso: 'warn',
            btnSucesso: 'Fechar'
          } as Alerta
        };
        this.dialog.open(AlertaComponent, config);
      }
      // Terceira parte seria o finally - poderia ter uma configuração para ser exibida independente de dar sucesso ou error.
      );
  }

}