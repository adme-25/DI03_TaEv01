import { Component, ViewChild } from '@angular/core';
import { GestionNoticias } from '../servicios/gestion-noticias';
import { Articulos } from '../interfaces/mis-interfaces';
import { GestionStorageService } from '../servicios/storage';
import { AlertaComponent } from '../componentes/alerta/alerta.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  //Para acceder al componente <app-alerta>
  @ViewChild(AlertaComponent) mostrarAlerta!: AlertaComponent;

  //Se injectan los servicios y se inician los articulos guardados en local
  constructor(public listArticulos: GestionNoticias, private almacen: GestionStorageService) {
      this.almacen.getObject("articulos");
  }
  
  //Ejecuta la alerta y el borrado de articulo al confirmarla 
  async alertaConfirmacion(articulo: Articulos) {
    this.mostrarAlerta.onConfirm = () => this.listArticulos.borrarArticulo(articulo);
    this.mostrarAlerta.presentAlert();
  }
}
