import { Component, OnInit, Input } from '@angular/core';
import { Article } from 'src/app/interfaces/interfaces';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DataLocalService } from 'src/app/services/data-local.service';
@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.scss'],
})
export class NoticiaComponent implements OnInit {

  @Input() noticia: Article;
  @Input() indice: number;
  @Input() enFavoritos;

  constructor(private iab: InAppBrowser,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
     private datalocalService: DataLocalService) { }

  ngOnInit() {}

  abrirNoticia() {
    // console.log('Noticia', this.noticia.url);
    const browser = this.iab.create(this.noticia.url, '_system');
  }

  async lanzarMenu() {

    let guardarBorarBtn;
    if (this.enFavoritos) {
      // borrar btn favoritos de la pagina de favoritos y poner el de eliminar
      guardarBorarBtn =  {
        text: 'Borrar Favorito',
        icon: 'trash',
        cssClass: 'action-dark',
        handler: () => {
         // console.log('Boorrar de favorito');
          this.datalocalService.borrarNoticiaFavorito( this.noticia);
        }
      };
    } else {
      guardarBorarBtn =  {
        text: 'Favorito',
        icon: 'star',
        cssClass: 'action-dark',
        handler: () => {
        //  console.log('Favorito clicked');
          this.datalocalService.guardarNoticia( this.noticia);
        }
      };
    }



    const actionSheet = await this.actionSheetCtrl.create({

      buttons: [{
        text: 'Compartir',
        icon: 'share',
        cssClass: 'action-dark',
        handler: () => {
         // console.log('Share clicked');
          this.socialSharing.share(
            this.noticia.title,
            this.noticia.source.name,  // Quien escribio la noticia
             '',
             this.noticia.url
          );
        }
      },
      guardarBorarBtn,
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        cssClass: 'action-dark',
        handler: () => {
         // console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();


  }

}
