import { Component, ViewChild, OnInit } from '@angular/core';
import { IonSegment } from '@ionic/angular';
import { NoticiasService } from 'src/app/services/noticias.service';
import { Article } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  @ViewChild(IonSegment) segment: IonSegment;
  noticias: Article[] = [];
  secciones = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];

constructor(private noticiasService: NoticiasService) {

}

  ngOnInit () {
// segment es la propiedad del ionSegment y tiene un value, aqui le asignamos un valor por defecto que seria business
    this.segment.value = this.secciones[0];
    this.cargarNoticias(this.secciones[0]);

  }

  cambioCategoria( event ) {
// cuando yo se que el usuario eligio otra opcion de la seccion, se resetea el valor y se vuelve a mandar la solicitud abajo
     this.noticias = [];
    // console.log(event.detail.value);
    this.cargarNoticias(event.detail.value);

  }

  cargarNoticias( seccion: string, event? ) {

    this.noticiasService.getTopHeadlinesSecciones(seccion)
    .subscribe(resp => {
     // console.log(resp); // resp es la que tiene los articulos o noticias.
      // Cuando se obtengan las noticias hay que insertarlas al arreglo
      this.noticias.push(...resp.articles);

      if (event) {
        event.target.complete(); // para cancelar el infinite Scroll
      }


    });
  }

  loadData(event) {
    this.cargarNoticias(this.segment.value, event );

  }

}
