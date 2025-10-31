import { Injectable } from '@angular/core';
import { Articulos } from '../interfaces/mis-interfaces';
import { Observable, Subject } from 'rxjs';
import { GestionStorageService } from './storage'

@Injectable({
  providedIn: 'root'
})
export class GestionNoticias {
  public articulosSeleccionados: Articulos[] = [];
  public cambios$= new Subject<Articulos[]>();
  

  constructor(private almacenaje: GestionStorageService ){
    let datosAlmacenados: Promise<Articulos[]> =  this.almacenaje.getObject("articulos");
    
    datosAlmacenados.then(noticias => {
      if (noticias) {
        this.articulosSeleccionados = noticias;
      }
    })
      
  }
  
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
    }
  }
  getSeleccionados(){
    return this.articulosSeleccionados;
  }
  
  getCambios(): Observable<Articulos[]> {
    return this.cambios$.asObservable();
  }
}
