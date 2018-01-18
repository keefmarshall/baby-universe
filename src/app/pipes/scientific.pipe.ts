import { Pipe, PipeTransform } from '@angular/core';
import {DecimalPipe} from '@angular/common';

@Pipe({
  name: 'scientific'
})
export class ScientificPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}

  transform(value: number, inDigits?: string): string {
    const digits = inDigits ? inDigits : '1.0-1';
    if (value > 1e9) {
      return value.toPrecision(4);
    } else {
      return this.decimalPipe.transform(value, digits);
    }
  }
}
