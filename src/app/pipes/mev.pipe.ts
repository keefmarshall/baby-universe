import { Pipe, PipeTransform } from '@angular/core';
import { NumberFormatter } from 'app/util/number-formatter';

@Pipe({
  name: 'mev'
})
export class MevPipe implements PipeTransform {
  private readonly numberFormatter = new NumberFormatter();

  transform(value: number, args?: string): string {
    return this.numberFormatter.abbreviateNumber(value * 1e6) + "eV";
  }

}
