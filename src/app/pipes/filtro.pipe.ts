import { Pipe, PipeTransform } from '@angular/core';
import { Comida } from '../Model/Comida';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform( valor: Comida[], texto: string): Comida[] {

    if (texto === '' ){
      return valor;
    }

   texto = texto.toLocaleLowerCase();

    return valor.filter( (comida) =>{
      return comida.fecha.toLocaleLowerCase().includes(texto) 
    });
  }

}