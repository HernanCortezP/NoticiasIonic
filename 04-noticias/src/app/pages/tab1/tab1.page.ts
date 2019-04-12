import { Component, OnInit } from '@angular/core';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
 noticias: Article[] = [];
 constructor(private noticiasService: NoticiasService) {

 }

 ngOnInit() {
   this.cargarNoticias();
 }

 loadData(event) {
     console.log(event);
    this.cargarNoticias(event);
 }

// el signo de interrogracion es para hacer opcional el recibir el evento o no, pq en el OnInit no hay ningun evento a lo primero
 cargarNoticias( event?) {
  this.noticiasService.getTopHeadlines()
   .subscribe( resp => {
    //  console.log('noticias', resp);

     if ( resp.articles.length === 0 ) { // si el tamaño es igual a 0 hay que cancelar el infinite-scroll.
            event.target.disabled = true;
            event.target.complete();
            return;
     }

// Cuando se obtengan las noticias hay que insertarlas al arreglo
      this.noticias.push( ...resp.articles );
// Los 3 puntos es el operador spread de javascript q lo q hace es insertar los elementos de forma independiente

    if ( event ) { // si existe el evento, si se puede llamar el infiniteScroll.
      event.target.complete();
    }

   });
 }

}
