import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';// Classe responsável por passar parâmetros em cconsultas REST
import { ConfigPrams } from '../shared/models/confg-parms';

@Injectable({
  providedIn: 'root'
})
export class ConfigParamsService {

  constructor() { }

  configurarParametros(config: ConfigPrams): HttpParams {
    let httpParams = new HttpParams();
    if (config.pagina) { // Esses parâmetros: _page, _limit, q... são do json-server, logo eles devem ser adaptados de acordo com a Api que for ser consumida 
      httpParams = httpParams.set('_page', config.pagina.toString());
    }
    if (config.limite) {
      httpParams = httpParams.set('_limit', config.limite.toString());
    }
    if (config.pesquisa) {
      httpParams = httpParams.set('q', config.pesquisa);
    }
    if (config.campo) {
      httpParams = httpParams.set(config.campo.tipo, config.campo.valor.toString());
    }
    httpParams = httpParams.set('_sort', 'id');
    httpParams = httpParams.set('_order', 'desc');

    return httpParams;
  }
}
