import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatter } from 'app/util/number-formatter';

@Pipe({
  name: 'illion'
})
export class IllionPipe implements PipeTransform {
  private readonly numberFormatter = new NumberFormatter();

  transform(value: number, args?: string): string {
    return this.numberFormatter.abbreviateNumber(value, 4, true, "NUM");
  }

}
