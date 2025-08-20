import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';

// Initialize global variables matching original designhome.html
(window as any).dGlobals = {
  scriptHelpUrl: '/help/scripting',
  designerHelpUrl: '/help/designer',
  translateJSONUrl: '/assets/i18n/',
  isDevMode: false
};

// Initialize brand configuration matching original
(window as any).app_brand_cfg = {
  name: 'Dashboard Designer',
  appShortName: 'BDB',
  logo: '/assets/images/logo.png',
  version: '16.0.0'
};

// Initialize header settings
(window as any).headerSettings = {
  signOuturl: 'default'
};

// Bootstrap the Angular application
bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient()
  ]
}).catch(err => console.error('Error starting Angular application:', err));