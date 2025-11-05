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
  //Array de Articulos para almacanar los seleccionados
  public seleccionados: Articulos[] = [];

  //Array de objetos Categorias para cargar las categorias de noticias en el segment
  public categoria: Categorias[] = [
    {label: 'GENERAL', value: 'general'},{label: 'BUSINESS', value: 'business'},{label: 'TECHNOLOGY', value: 'technology'},
    {label: 'SCIENCE', value: 'science'}, {label: 'HEALTH', value: 'health'},{label: 'SPORTS', value: 'sports'}
  ];
  //categoria por defecto al inicio
  public seleccion: string = "general";

  constructor(public listaRest: ConsultaRest, public listaArticulos: GestionArchivo, public gestionArticulos: GestionNoticias, private almacen: GestionStorageService) {
  }

  //Se cargan al inicio: la lista de noticias del servicio rest,
  //  los archivos almacenados en local
  //  y los marca como seleccionados para el check-box
  ngOnInit(){
    //Queda comentado el acceso anterior al archivo json de noticias
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

  //Recoge el evento del segment para asignar categoria y cargar sus articulos
  categoriaNoticias(event: any) {
    this.seleccion = event.detail.value;
    console.log("la seleccion es: " + this.seleccion);
    this.listaRest.getListaNoticiasRest(this.seleccion);
  }

  //evento del check-box para añadir o borrar articulos
  //al servicio GestioNoticias inyectado en el constructor
  onIonChange(event: any, articulo: Articulos) {
    if(event.detail.checked) {
      this.gestionArticulos.anadirArticulo(articulo);
    }else {
      this.gestionArticulos.borrarArticulo(articulo);
    }
    console.log(this.gestionArticulos);
  }

  //Gestiona el estado de los check-box
  estaSeleccionado(articulo: Articulos): boolean {
    return this.seleccionados.some(a => a.title === articulo.title);
  }
}
