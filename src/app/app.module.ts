import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { MyApp } from './app.component';
import {ShoppingListPage} from '../pages/shopping-list/shopping-list';
import {AddShoppingPage} from '../pages/add-shopping/add-shopping';
import {DetalhesPage} from '../pages/detalhes/detalhes';
import { EditShoppingItemPage } from '../pages/edit-shopping-item/edit-shopping-item';
import { FIREBASE_CREDENTIALS } from './firebase.credentials';

@NgModule({
  declarations: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage,
    DetalhesPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
   //inicializar angularfire com credenciais do painel 
    AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),
   //import the angularFireDatabaseModule to use database interactions
    AngularFireDatabaseModule     
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ShoppingListPage,
    AddShoppingPage,
    EditShoppingItemPage,
    DetalhesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
