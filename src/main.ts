import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import 'rxjs/Rx';
import { enableProdMode } from '@angular/core';
import { AppModule, environment } from './app/';

if (environment.production) {
  enableProdMode();
}

//bootstrap(AppComponent, [appRoutingProviders]);
platformBrowserDynamic().bootstrapModule(AppModule);
