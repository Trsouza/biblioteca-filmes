import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Filme } from 'src/app/shared/models/filme';
import { ConfigParamsService } from './config-params.service';
import { ConfigPrams } from '../shared/models/confg-parms';

const url = 'http://localhost:3000/filmes/';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
    private configService: ConfigParamsService) { }

  listar(config: ConfigPrams): Observable<Filme[]> {
    const configPrams = this.configService.configurarParametros(config);
    return this.http.get<Filme[]>(url, { params: configPrams });
  }

  visualizar(id: number): Observable<Filme> {
    return this.http.get<Filme>(url + id);
  }

  editar(filme: Filme): Observable<Filme> {
    return this.http.put<Filme>(url + filme.id, filme);
  }

  salvar(filme: Filme): Observable<Filme> {
    return this.http.post<any>(url, filme);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(url + id);
  }
}

