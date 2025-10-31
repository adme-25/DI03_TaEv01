import { Component } from '@angular/core';
import { GestionArchivo } from '../servicios/gestion-archivo';
import { GestionNoticias } from '../servicios/gestion-noticias';
import { Articulos, Categorias } from '../interfaces/mis-interfaces';
import { GestionStorageService } from '../servicios/storage';
import { ConsultaRest } from '../servicios/consulta-rest';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  public seleccionados: Articulos[] = [];

  public categoria: Categorias[] = [
    {label: 'GENERAL', value: 'general'},{label: 'BUSINESS', value: 'business'},{label: 'TECHNOLOGY', value: 'technology'},
    {label: 'SCIENCE', value: 'science'}, {label: 'HEALTH', value: 'health'},{label: 'SPORTS', value: 'sports'}
  ];

  public seleccion: string = "general";

  constructor(public listaRest: ConsultaRest, public listaArticulos: GestionArchivo, public gestionArticulos: GestionNoticias, private almacen: GestionStorageService) {

  }

  ngOnInit(){
    
      //this.listaArticulos.getArchivoNoticias();
      this.listaRest.getListaNoticiasRest(this.seleccion);

      let datosAlmacenados: Promise<Articulos[]> =  this.almacen.getObject("articulos");
      datosAlmacenados.then(noticias => {
        if (noticias) {
          this.seleccionados = noticias;
        }
      })

      this.gestionArticulos.getCambios().subscribe(data => {
      this.seleccionados = data;

    });
    
  }

  categoriaNoticias(event: any) {
    this.seleccion = event.detail.value;
    console.log("la seleccion es: " + this.seleccion);
    this.listaRest.getListaNoticiasRest(this.seleccion);
  
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
