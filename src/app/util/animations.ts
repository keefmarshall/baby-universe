import { trigger, style, state, transition, animate, group } from '@angular/animations';

export class Animations {
    static fadePresentTrigger(delay: number = 2000) {
      return [
        state('present', style({ opacity: 1 })),
        state('faded', style({ opacity: 0 })),
        transition('present => faded', [
          animate(`${delay}ms`, style({ opacity: 0 }))
        ]),
        transition('faded => present', [
          animate(`${delay}ms`, style({ opacity: 1 })),
        ]),
      ];
    }

    static colorChangeTrigger(from: string, to: string, delay: number = 2000) {
        return [
            state('start', style({ backgroundColor: from })),
            state('end', style({ backgroundColor: to })),
            transition('start => end', [animate(`${delay}ms linear`)]),
            transition('end => start', [animate(`${delay}ms linear`)])
        ];
    }
}
