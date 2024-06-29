import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sigla',
  standalone: true
})
export class SiglaPipe implements PipeTransform {

  transform(value: string) {
    return value.split(' ').map((res) => res[0]).join('').toLocaleUpperCase();
  }

}
