import { FilmesModule } from './filmes/filmes.module';
import { MaterialModule } from './shared/material/material.module';
import { RodapeComponent } from './shared/components/rodape/rodape.component';
import { TopoComponent } from './shared/components/topo/topo.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    TopoComponent,
    RodapeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    FilmesModule // Quando ele importa um módulo e fica sabendo que dentro dele conterá todos os imports de filmes
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'pt'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
