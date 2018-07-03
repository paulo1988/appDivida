import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ShoppingItem } from '../../models/shopping-item/shopping-item-interface';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-add-shopping',
  templateUrl: 'add-shopping.html',
})
export class AddShoppingPage {

  vl:number;
  vl1:number;
  valorParcela:number;
  shoppingItem = {} as ShoppingItem;
  shoppingItemRef$: FirebaseListObservable<ShoppingItem[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private database: AngularFireDatabase) {  
      this.shoppingItemRef$ = this.database.list('shopping-list');
     
    /*
        shopping-list:

         0: 
           itemName:'Pizza',
           itemNumber: 1
         1:
           itemName: 'cheesecake',
           itemNumber: 5  
    */

  }


  AddShoppingItem(shoppingItem: ShoppingItem){

  //  this.d = this.shoppingItem.myDate.getDay();
   // this.m = this.shoppingItem.myDate.getMonth(); 
   // this.y = this.shoppingItem.myDate.getFullYear;
    //this.str = this.d+'/'+this.m+'/'+this.d;
   
    //this.myDate.setDate(this.myDate.getDate());
    //this.data = this.myDate.toISOString();
 
 

   /*
     create a new anonymous object and convert itemNumber to a
     number.
     push this to our firebase database under the 'shopping-list'
     node
   */
  
    this.shoppingItem.valorParcela = this.shoppingItem.valor/this.shoppingItem.qtdParcela;
     this.shoppingItem.tipoDivida = "pendente";
      
      if(this.shoppingItem.valorParcela<=9.99){
           this.vl=3;
      }else if(this.shoppingItem.valorParcela<=99.9){
        this.vl=4;
      }else if(this.shoppingItem.valorParcela<=999.9){
           this.vl=5;
      }else if(this.shoppingItem.valorParcela<=9999.9){
        this.vl=6;
      }else if(this.shoppingItem.valorParcela<=99999.9){
        this.vl=7;
      }

      if(this.shoppingItem.valor<=9.99){
        this.vl1=3;
   }else if(this.shoppingItem.valor<=99.9){
     this.vl1=4;
   }else if(this.shoppingItem.valor<=999.9){
        this.vl1=5;
   }else if(this.shoppingItem.valor<=9999.9){
     this.vl1=6;
   }else if(this.shoppingItem.valor<=99999.9){
     this.vl1=7;
   }
      this.shoppingItem.pega=this.shoppingItem.valor;
    this.shoppingItemRef$.push({
       itemName: this.shoppingItem.itemName,
       valor: Number(this.shoppingItem.valor).toPrecision(this.vl1),
       myDate: this.shoppingItem.myDate,
       tipoDivida: this.shoppingItem.tipoDivida,
       qtdParcela: Number(this.shoppingItem.qtdParcela),
       valorParcela: Number(this.shoppingItem.valorParcela).toPrecision(this.vl),
       tipoPagamento: this.shoppingItem.tipoPagamento,
       histValor: Number(this.shoppingItem.valor).toPrecision(this.vl),
       histValorParcela: Number(this.shoppingItem.valorParcela).toPrecision(this.vl),
       pega: Number(this.shoppingItem.pega)
    });
   
        //reset our shoppingItem
        this.shoppingItem = {} as ShoppingItem;
        
        //Navigate the user back to the shoppingListPage
        this.navCtrl.pop();
        
  }    
   
}
