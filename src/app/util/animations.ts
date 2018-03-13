import { trigger, style, state, transition, animate, group } from '@angular/animations';

export class Animations {
    static readonly fadePresentTrigger = [
        state('present', style({ opacity: 1 })),
        state('faded', style({ opacity: 0 })),
        transition('present => faded', [
          animate('2000ms', style({ opacity: 0 }))
        ]),
        transition('faded => present', [
          animate('2000ms', style({ opacity: 1 })),
        ]),
      ];

    static colorChangeTrigger(from: string, to: string, delay: number = 2000) {
        return [
            state('start', style({ 'background-color': from })),
            state('end', style({ 'background-color': to })),
            transition('start => end', [
              animate(`${delay}ms`, style({ 'background-color': to }))
            ]),
            transition('faded => present', [
              animate(`${delay}ms`, style({ 'background-color': from })),
            ])
        ];
    }
}
