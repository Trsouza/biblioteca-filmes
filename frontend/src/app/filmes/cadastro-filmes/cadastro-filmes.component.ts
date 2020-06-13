import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
    private fb: FormBuilder,
    public validacao: ValidarCamposService,
    public filmesService: FilmesService,
    public dialog: MatDialog,
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

    const filme = this.cadastro.getRawValue()as Filme;  // retorna os campos que existem dentro do formGroup cadastro
    this.salvar(filme);

  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme) : void {
    this.filmesService.salvar(filme).subscribe(() =>{
      alert('sucesso')
    }),
    () => {
      alert('Erroao salvar');
    }
    
  }


}