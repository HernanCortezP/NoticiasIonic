import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Article } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  noticias: Article[] = []; // arreglo en el q se almacenaran las noticias de favoritos

  constructor(private storage: Storage,
    public toastController: ToastController) {

    this.cargarFavoritos();

   }

   async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500
    });
    toast.present();
  }


  guardarNoticia (noticia: Article) {
// el find en ls arreglos busca un elemento que coincida con la condicion, si encuentra algo regresa ese elemento del arreglo sino undefined

    const existe = this.noticias.find(noti => noti.title === noticia.title);

    if (!existe) { // si no existe en favoritos, entonces si se puede guardar para no guardar en favs la misma 2 veces
      this.storage.set('favoritos', this.noticias);
      this.noticias.unshift(noticia); // el unshift es para ponerla al principio del arreglo
      this.presentToast('Agregado a favorito');
  }

  }

// tslint:disable-next-line:max-line-length
// este sera el encargado de leer el storage y ver si hay informacion si hay q carge los fav sino que deje el arreglo vacio y decir q no hay data
  async cargarFavoritos () {
    // para obtener los datos del storage de favoritos para eso pide la key q es 'favoritos' la de arriba
const favoritos = await this.storage.get('favoritos'); // esto regresa una promesa en la cual tendriamos la data de favoritos.
// cuando esta funcion se dispare va a meter en el arreglo de noticias todos los favoritos.

  if (favoritos) { // si favoritos no es nulo o si existe, que iguale el arreglo aqui con los favoritos.
    this.noticias = favoritos;
}
// esto es una de las formas de hacerlo pero menos complejo con el asycn await
// .then( favoritos => {
// // si los favoritos no existen o no se guardado nada con esa llave devuelve undefined, de lo contrario si devuelve los favs
// console.log('favoritos', favoritos);

//    });

//   }
}
borrarNoticiaFavorito(noticia: Article) {

// esta funcion regresa un nuevo arreglo pero sin el elemento que se desea borrar.
  this.noticias = this.noticias.filter( noti => noti.title !== noticia.title );
  this.storage.set('favoritos', this.noticias);
  // aqui se guarda nuevamente lo q quede en el arreglo de noticias despues de haberlo borrado arriba
  this.presentToast('Borrado de favoritos');

}

}
