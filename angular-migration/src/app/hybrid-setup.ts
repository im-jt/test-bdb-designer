import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

// Angular Services
import { DesignerService } from './services/designer.service';
import { AuthService } from './services/auth.service';
import { ThemeService } from './services/theme.service';

// Angular Components (Standalone components don't need to be declared)
import { AppComponent } from './app.component';

// Routes
import { routes } from './app.routes';

@NgModule({
  declarations: [
    // Only declare non-standalone components here
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    AppComponent // Import the standalone app component
  ],
  providers: [
    DesignerService,
    AuthService,
    ThemeService
  ]
})
export class AppModule {}

// Factory for downgrading Angular services to AngularJS
export function downgradeService(serviceClass: any, name: string) {
  return {
    provide: name,
    useFactory: (injector: any) => injector.get(serviceClass),
    deps: ['$injector']
  };
}

// Factory for upgrading AngularJS services to Angular
export function upgradeService(serviceName: string) {
  return {
    provide: serviceName,
    useFactory: (injector: any) => injector.get(serviceName),
    deps: ['$injector']
  };
}