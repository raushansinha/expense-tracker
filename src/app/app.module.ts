import { DetailPage } from './../pages/detail/detail';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ExpenseService } from './expense.service'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

@NgModule({
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  declarations: [
    MyApp,
    HomePage,
    DetailPage
  ],
  entryComponents: [
    MyApp,
    HomePage,
    DetailPage
  ],
  providers: [
    ExpenseService,
    StatusBar,
    SplashScreen,
    {
      provide: ErrorHandler, 
      useClass: IonicErrorHandler
    }
  ],
  bootstrap: [IonicApp]
})
export class AppModule {}
