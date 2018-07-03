import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem} from '../../models/shopping-item/shopping-item-interface';


@IonicPage()
@Component({
  selector: 'page-detalhes',
  templateUrl: 'detalhes.html',
})
export class DetalhesPage {

  shoppingItem: ShoppingItem;
  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,private database: AngularFireDatabase) {

    this.shoppingListRef$ = this.database.list(this.shoppingItem.$key+'/shopping-list');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalhesPage');
  }

}
