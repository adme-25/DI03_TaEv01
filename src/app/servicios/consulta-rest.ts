import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Articulos, Noticias } from '../interfaces/mis-interfaces';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultaRest {

  public listArticulos: Articulos[] = [];
  apiKey: string = environment.apiKey;
  apiUrl: string = environment.apiUrl;

  //Hacemos uso de BehaviorSubject tipo json (categoria y totalResults o undefined).
  //BehaviorSubject es un tipo especial de Observable que siempre tiene un valor actual y emite ese valor inmediatamente a los nuevos suscriptores. En este caso,
  //emite objetos de tipo "{ categoria: string; totalResults: number } | undefined"
  private datosSubject: BehaviorSubject<{ categoria: string; totalResults: number }|undefined> = new BehaviorSubject<{ categoria: string; totalResults: number }|undefined>(undefined);
  //Creamos el observable datos$ para gestionar los cambios que vienen desde la api.
  public datos$: Observable<{ categoria: string; totalResults: number }|undefined> = this.datosSubject.asObservable();

  constructor(private leerServicioRest: HttpClient) {}

  getListaNoticiasRest(categoria: string){
    //Realizamos la llamada api y la recogemos en un observable de tipo RespuestaNoticias
    let respuesta: Observable<Noticias> = this.leerServicioRest.get<Noticias>("https://newsapi.org/v2/top-headlines?country=us&category=" + categoria + "&apiKey=" + this.apiKey);

    respuesta.subscribe( data => {
       this.listArticulos = []; // Limpiamos la lista antes de añadir los nuevos artículos
       this.listArticulos.push(...data.articles);
    });
  }

    getArticulos(){
    return this.listArticulos;
  }
}
