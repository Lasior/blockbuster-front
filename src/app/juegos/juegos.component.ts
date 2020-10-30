import { Component, OnInit } from '@angular/core';
import { AlertService } from '../alert/alert.service';
import { Juego } from './juego';
import { JuegoService } from './juego.service';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  showID: boolean = false;

  juegos: Juego[];

  constructor(private juegoService: JuegoService, private alertService: AlertService) { }

  switchId(): void {
    this.showID = !this.showID;
  }

  ngOnInit(): void {
    this.refreshJuegos();
  }

  delete(juego: Juego): void {
    if (confirm(`¿Seguro que quiere borrar el juego "${juego.titulo}"?`)) {
      this.juegoService.delete(juego.idJuego).subscribe(
        response => {
          this.alertService.success(`Se ha borrado correctamente el juego: "${juego.titulo}" con ID: ${juego.idJuego}`, { autoClose: true, keepAfterRouteChange: false })
          this.refreshJuegos();
        }
      );
    }
  }

  private refreshJuegos(): void {
    this.juegoService.getJuegos().subscribe(
      juegos => this.juegos = juegos
    );
  }
}