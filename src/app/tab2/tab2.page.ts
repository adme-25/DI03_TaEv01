import { Component } from '@angular/core';
import { GestionNoticias } from '../servicios/gestion-noticias';
import { AlertController } from  '@ionic/angular'
import { Articulos } from '../interfaces/mis-interfaces';
import { GestionStorageService } from '../servicios/storage';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  constructor(public listArticulos: GestionNoticias, private alertCtrl: AlertController, private almacen: GestionStorageService) {
      this.almacen.getObject("articulos");
  }
  
  async alertaConfirmacion(articulo: Articulos) {
    let alert = await this.alertCtrl.create({
      header: 'Borrar',
      message: 'Quieres eliminar esta noticia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Borrar',
          handler: (data) => {
            this.listArticulos.borrarArticulo(articulo);
          }
        }
      ]
    });
    await alert.present();
  }
}
