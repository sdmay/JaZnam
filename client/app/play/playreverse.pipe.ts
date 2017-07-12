import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'playreverse',
  pure: false
})
export class PlayreversePipe implements PipeTransform {
  transform(value) {
    return value.slice().reverse();
  }

}
