import { Component } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  porcentaje: number = 0;
  temperatura: number = 0;

  constructor() {}

  ngOnInit() {
    // Lógica para verificar la temperatura y enviar notificaciones
    setInterval(() => {
      this.verificarTemperatura();
    }, 60000); // Verificar cada minuto
  }

  getColor() {
    const hue = (this.porcentaje / 50) * 240;
    return `hsl(${hue}, 100%, 50%)`;
  }

  calcularTemperatura() {
    const temperaturaRojo = 24;
    const temperaturaAzul = 15;
    const porcentaje = this.porcentaje / 50;

    // Interpolación lineal entre las temperaturas roja y azul según el porcentaje
    this.temperatura = (1 - porcentaje) * temperaturaRojo + porcentaje * temperaturaAzul;
  }

  verificarTemperatura() {
    this.calcularTemperatura();
    this.enviarNotificacion();
  }

  async enviarNotificacion() {
    if (this.temperatura > 24) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Alerta de temperatura',
            body: `La temperatura ha excedido los 24 grados Celsius (${this.temperatura.toFixed(2)}°C).`,
            id: 1,
          },
        ],
      });
    } else if (this.temperatura < 15) {
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Alerta de temperatura',
            body: `La temperatura es menor a 15 grados Celsius (${this.temperatura.toFixed(2)}°C).`,
            id: 2,
          },
        ],
      });
    }
  }


  
}
