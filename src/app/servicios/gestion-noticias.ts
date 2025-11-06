import { Injectable } from '@angular/core';
import { Articulos } from '../interfaces/mis-interfaces';
import { Observable, Subject } from 'rxjs';
import { GestionStorageService } from './storage'

@Injectable({
  providedIn: 'root'
})
export class GestionNoticias {
  //Array donde se guardarán los articulos selecciondos
  public articulosSeleccionados: Articulos[] = [];

  //bservable de tipo subject para mantener actualizados los check-box
  public cambios$= new Subject<Articulos[]>();

  //Carga los datos almacenados en local y los seleccionados a marcar en check-box
  constructor(private almacenaje: GestionStorageService ){
    let datosAlmacenados: Promise<Articulos[]> =  this.almacenaje.getObject("articulos");
    datosAlmacenados.then(noticias => {
      if (noticias) {
        this.articulosSeleccionados = noticias;
      }
    })
  }
  
  //Busca coincidencias entre artículos por el título
  compararTitulos(articulo: Articulos){
    let coincidencia: boolean = false;
    for (let titulo of this.articulosSeleccionados){
      if(articulo.title === titulo.title){
          coincidencia=true
      }
    }
    return coincidencia;
  }

  anadirArticulo(articulo: Articulos){
    if (!this.compararTitulos(articulo)){
      this.articulosSeleccionados.push(articulo);
      this.cambios$.next(this.articulosSeleccionados);
      this.almacenaje.setObject("articulos", this.articulosSeleccionados);
    }
  }

  borrarArticulo(articulo: Articulos){
    if (this.compararTitulos(articulo)){
      let indice = this.articulosSeleccionados.indexOf(articulo);
      this.articulosSeleccionados.splice(indice,1);
      this.cambios$.next(this.articulosSeleccionados);
      this.almacenaje.setObject("articulos", this.articulosSeleccionados);
      console.log("Articulo borrado " + this.almacenaje);
    }
  }

  getSeleccionados(){
    return this.articulosSeleccionados;
  }
  
  //Devuelve el observable de los articulos que deben estar seleccionados en el check-box
  getCambios(): Observable<Articulos[]> {
    return this.cambios$.asObservable();
  }
}
