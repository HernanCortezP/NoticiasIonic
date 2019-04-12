import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RespuestaTopHeadlines } from '../interfaces/interfaces';
import { environment } from 'src/environments/environment';

const apiKey = environment.apikey;
const apiUrl = environment.apiUrl;

const headers = new HttpHeaders({
  'X-Api-key': apiKey
});

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {
  numerodePagina = 0;
  seccionActual = '';
  numPagSeccion = 0; // este servira para saber que numero de pagina de cualquier seccion quiere cargar.

  constructor(private http: HttpClient) { }
// la T es una propiedad de Typescript en la cual le esta diciendo que ahi va a recibir un tipo y la respuesta sera de ese mismo tipo.

  private ejecutarQuery<T>(query: string) {

       query = apiUrl + query;

     return this.http.get<T>(query, {headers});

  }

  getTopHeadlines() {
// tslint:disable-next-line:max-line-length
// return this.http.get<RespuestaTopHeadlines>(`https://newsapi.org/v2/everything?q=bitcoin&from=2019-03-08&sortBy=publishedAt&apiKey=232ce044f0bc4acca59f04b7f305b4c1`);
   this.numPagSeccion ++;
   return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&page=${this.numerodePagina}`);
  }

  getTopHeadlinesSecciones (seccion: string) {
// si la seccion actual es igual a la seccion que recibo como argumento, eso quiere decir que si quiere cargar mas noticias de esa seccion
    if (this.seccionActual === seccion ) {
      this.numPagSeccion++;
    } else {
// caso contrario quiere decir que esta cargando una nueva seccion
        this.numPagSeccion = 1; // carga la pagina uno de la nueva seccion
        this.seccionActual = seccion; // se reestablece la seccion, a la que el usuario esta pidiendo ahora.
    }
    return this.ejecutarQuery<RespuestaTopHeadlines>(`/top-headlines?country=us&category=${seccion}&page=${this.numPagSeccion}`);

  }

}
