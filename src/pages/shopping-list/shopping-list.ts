import { Component } from '@angular/core';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AddShoppingPage } from '../add-shopping/add-shopping';
import { FirebaseListObservable,FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem} from '../../models/shopping-item/shopping-item-interface';
import { EditShoppingItemPage} from '../edit-shopping-item/edit-shopping-item';
import {DetalhesPage} from '../detalhes/detalhes';
import { DISABLED } from '@angular/forms/src/model';
import { ShoppingListPageModule } from './shopping-list.module';  
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  
  first:boolean;
  shoppingListRef$: FirebaseListObservable<ShoppingItem[]>;
  shoppingItem = {} as ShoppingItem; 
  pega:number;
  p:any;
  valorp:any;
  obj:EditShoppingItemPage;

  constructor(public navCtrl: NavController, 
      public navParams: NavParams,
       private database: AngularFireDatabase, 
        private actionSheetCtrl: ActionSheetController) {
                
          
                this.shoppingListRef$ = this.database.list('/shopping-list');

              this.p = {
                valorTotal:0
              }  
 
                
                      

              }

  selectShoppingItem(shoppingItem: ShoppingItem){

    
    
  

    this.actionSheetCtrl.create({
       title: `${shoppingItem.itemName}`,
       
       buttons: [
        {
          text: 'Detalhes',
          handler: () =>{
            //Send the user to the EditShoppingItemPage and
            //pass the key as a parameter
            this.navCtrl.push(EditShoppingItemPage, 
              {shoppingItemId: shoppingItem.$key,
              valor: shoppingItem.valor});
              
          }
        },
        
       {
          text: 'Excluir Divida',
          role: 'destructive', 
          handler: () =>{
            //Delete the current ShoppingItem, passed in via the
            //parameter
            this.shoppingListRef$.remove(shoppingItem.$key);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () =>{
                console.log("The user has selected the cancel button");
          }
        }

       ]


    }).present();

  }

 
 

  navigateToAddShoppingPage(){
           this.navCtrl.push(AddShoppingPage);

  }

  

  

/*
  Metodo de teste para testar um item como botao
  teste(){
      console.log('item botao funciona!!');

        }
*/
}
