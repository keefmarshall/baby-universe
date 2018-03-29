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

  addOne() {
    if (this.value < this.max) {
      this.value ++;
      this.valueChange.emit(this.value);
    }
  }

  subtractOne() {
    if (this.value > this.min) {
      this.value --;
      this.valueChange.emit(this.value);
    }
  }

}
