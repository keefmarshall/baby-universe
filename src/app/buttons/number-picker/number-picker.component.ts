import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-number-picker',
  templateUrl: './number-picker.component.html',
  styleUrls: ['./number-picker.component.scss']
})
export class NumberPickerComponent {
  @Input() min: number = 0;
  @Input() max: number = Infinity;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  constructor() { }

  subtract(n: number = 1) {
    if (this.value >= (this.min + n)) {
      this.value -= n;
      this.valueChange.emit(this.value);
    }
  }

  add(n: number = 1) {
    if (this.value <= (this.max - n)) {
      this.value += n;
      this.valueChange.emit(this.value);
    }
  }
}
