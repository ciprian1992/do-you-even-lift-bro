import { NgModule, inject, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PromptUpdateService } from './services/prompt-update.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'do-you-even-lift-bro-bafd1',
        appId: '1:497674374816:web:2a4e4bcb0d83f7a6f203c5',
        storageBucket: 'do-you-even-lift-bro-bafd1.appspot.com',
        apiKey: 'AIzaSyAkI9hxRIUcwuNhgjL4shdkWLMskDyV4QY',
        authDomain: 'do-you-even-lift-bro-bafd1.firebaseapp.com',
        messagingSenderId: '497674374816',
        measurementId: 'G-D2L13QKWEN',
      })
    ),
    provideAuth(() => getAuth()),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {
  private promptUpdateService = inject(PromptUpdateService);
}
