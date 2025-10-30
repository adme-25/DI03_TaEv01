import { Injectable } from '@angular/core';
import { Articulos, Noticias } from '../interfaces/mis-interfaces';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class GestionArchivo {
  listaNoticias: Articulos[] = [];

  constructor(private leerArchivo: HttpClient) {
    this.getArchivoNoticias();
  }

  getArchivoNoticias(){
    let datosArchivo$: Observable<Noticias>;
    datosArchivo$ = this.leerArchivo.get<Noticias>("/assets/datos/articulos.json");

    datosArchivo$.subscribe(datos => {
      datos.articles.forEach(articulo => {this.listaNoticias.push(articulo);});
      console.log(datos.articles);
    })
  }
  getArticulos(){
    return this.listaNoticias;
  }
}
