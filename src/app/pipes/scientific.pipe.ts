import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'scientific'
})
export class ScientificPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number): string {
    if (value > 1e10) {
      return value.toPrecision(4);
    } else {
      return this.decimalPipe.transform(value, '1.1-1');
    }
  }
}
