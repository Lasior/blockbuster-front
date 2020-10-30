import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Juego} from './juego'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class JuegoService {

  urlServer: string = 'http://localhost:8090/';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient, private alertService: AlertService) { }

  getJuegos(): Observable<Juego[]> {
    //return of(JUEGOS)
    return this.http.get<Juego[]>(this.urlServer + 'juegos').pipe(
      catchError(e => {
        console.error(`getJuegos error: "${e.message}"`);
        this.alertService.error(`Error al consultar los juegos: "${e.message}"`,{autoClose: false, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }

  create(juego: Juego): Observable<Juego> {
    return this.http.post<Juego>(this.urlServer + 'juegos', juego, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(`create error: "${e.message}"`);
        if(e.status == 400) {
          e.error.errorMessage.replace('[','').replace(']','').split(', ').forEach(errorMessage =>
            this.alertService.error(errorMessage)
          );
        } else {
          this.alertService.error(`Error al crear el juegos: "${e.message}"`,{autoClose: true, keepAfterRouteChange: false});
        }
        return throwError(e);
      })
    );
  }

  getJuego(id: number): Observable<Juego> {
    return this.http.get<Juego>(`${this.urlServer}juegos/${id}`).pipe(
      catchError(e => {
        console.error(`getJuego error: "${e.message}"`);
        this.alertService.error(`Error al consultar el juego: "${e.message}"`,{autoClose: false, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }

  update(juego: Juego): Observable<Juego> {
    return this.http.put<Juego>(`${this.urlServer}juegos/${juego.idJuego}`,juego ,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(`update error: "${e.message}"`);
        if (e.status == 400) {
          e.error.errorMessage.replace('[', '').replace(']', '').split(', ').reverse().forEach(errorMessage => {
            this.alertService.error(errorMessage);
          });
        } else {
          this.alertService.error(`Error al actualizar el juego: "${e.message}"`);
        }
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.urlServer}juegos/${id}`).pipe(
      catchError(e => {
        console.error(`delete error: "${e.message}"`);
        this.alertService.error(`Error al borrar el juego: "${e.message}"`,{autoClose: false, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }
}