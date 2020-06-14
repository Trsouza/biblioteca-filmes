import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { FilmesModule } from './filmes/filmes.module';
import { HttpClientModule } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { MaterialModule } from './shared/material/material.module';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { TopoComponent } from './shared/components/topo/topo.component';
import { AlertaComponent } from './shared/components/alerta/alerta.component';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent,
    AlertaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    LayoutModule,
    FilmesModule // Quando se importa um módulo o Angular fica sabendo que dentro dele conterá todos os imports de filmes
  ],
  entryComponents:[AlertaComponent], // É inicializado ao carregar a aplicação
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
