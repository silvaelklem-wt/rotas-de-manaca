import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideEnvironmentNgxMask } from 'ngx-mask';

// Firebase imports
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  projectId: "hotel-95f76",
  appId: "1:1071696392055:web:060673a7ab6ef25399fb72",
  databaseURL: "https://hotel-95f76-default-rtdb.firebaseio.com",
  storageBucket: "hotel-95f76.firebasestorage.app",
  apiKey: "AIzaSyC5yy9JhL4Opi1M85wOFLitCYBm4YTBS0c",
  authDomain: "hotel-95f76.firebaseapp.com",
  messagingSenderId: "1071696392055",
  measurementId: "G-GF26B61MSF" 
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideEnvironmentNgxMask(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};