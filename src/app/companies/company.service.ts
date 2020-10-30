import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../alert/alert.service';
import { Company } from './company';

@Injectable()
export class CompanyService {

  urlServer: string = 'http://localhost:8090/';

  constructor(private http: HttpClient, private alertService: AlertService) { }

  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.urlServer + 'companies').pipe(
      catchError(e => {
        console.error(`getCompanies error: "${e.message}"`);
        this.alertService.error(`Error al consultar las compañias: "${e.message}"`,{autoClose: false, keepAfterRouteChange: false});
        return throwError(e);
      })
    );
  }
}