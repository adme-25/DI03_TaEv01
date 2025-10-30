import { Component } from '@angular/core';
import { GestionArchivo } from '../servicio/gestion-archivo';
import { GestionNoticias } from '../servicio/gestion-noticias';
import { Articulos } from '../interfaces/mis-interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  seleccionados: Articulos[] = [];

  constructor(public listaArticulos: GestionArchivo, public gestionArticulos: GestionNoticias) {
  }

  ngOnInit(){
      this.gestionArticulos.getCambios().subscribe(data => {
      this.seleccionados = data;
    });
  }

  onIonChange(event: any, articulo: Articulos) {
    if(event.detail.checked) {
      this.gestionArticulos.anadirArticulo(articulo);
    }else {
      this.gestionArticulos.borrarArticulo(articulo);
    }
    console.log(this.gestionArticulos);
  }

  estaSeleccionado(articulo: Articulos): boolean {
    return this.seleccionados.some(a => a.title === articulo.title);
  }
}
