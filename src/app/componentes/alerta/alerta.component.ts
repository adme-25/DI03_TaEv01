import { Component, Input, OnInit } from '@angular/core';
import { AlertController, IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss'],
  imports: [IonicModule],
})
export class AlertaComponent  implements OnInit {

  @Input() onConfirm: () => void = () => {};

  constructor(private alerta: AlertController) { }

  ngOnInit() {}
  
  async presentAlert() {
    const alert = await this.alerta.create({
      header: "Confirmar",
      message: "Quieres confirmar la operacion",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.onConfirm(); // Ejecuta el método que se pasa desde la página
          }
        }
      ]
    });
    await alert.present();
  }
}
