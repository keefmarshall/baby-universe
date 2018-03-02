import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import 'hammerjs';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { faThermometerHalf } from '@fortawesome/fontawesome-free-solid';
import fontawesome from '@fortawesome/fontawesome';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);

fontawesome.library.add(faThermometerHalf);