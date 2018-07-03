import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FirebaseListObservable,FirebaseObjectObservable, AngularFireDatabase } from 'angularfire2/database';
import { ShoppingItem } from '../../models/shopping-item/shopping-item-interface';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'page-edit-shopping-item',
  templateUrl: 'edit-shopping-item.html',
})


export class EditShoppingItemPage {

  
  
  shoppingItemSubscription: Subscription; 
  shoppingItemRef$: FirebaseObjectObservable<ShoppingItem>;
  shoppingItem = {} as ShoppingItem;
  person:any;
  
  
  valorp:any;
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private database: AngularFireDatabase) {

                    
       //capture the shoppingItemId as a navParmeter     
       const shoppingItemId = this.navParams.get('shoppingItemId');
        this.valorp = this.navParams.get('valor');         
       //log out the navParam
       this.valorp.toPrecision(6);
       console.log('valor'+this.valorp.toPrecision(6));
       console.log(shoppingItemId);
       //set the scope of our firebase object equal to our selected item
       this.shoppingItemRef$ = this.database.object(`shopping-list/${shoppingItemId}`);
       //subscribe to the object and assign the result to this.shoppingItem
       

       this.shoppingItemSubscription = 
       this.shoppingItemRef$.subscribe(
       shoppingItem => this.shoppingItem = shoppingItem);     
       
       /*this.shoppingItemRef$.subscribe(shoppingItem => this.shoppingItem = shoppingItem); */ 
  

       if(this.shoppingItem.valor<=9.99){
          

              this.person = {
                         valor: this.shoppingItem.valor.toPrecision(3)    
                            }
    }else if(this.shoppingItem.valor<=99.9){
     

           this.person = {
                      valor: this.shoppingItem.valor.toPrecision(4)    
                         }


    }else if(this.shoppingItem.valor<=999.9){
     

           this.person = {
                      valor: this.shoppingItem.valor.toPrecision(5)    
                }

    }else if(this.shoppingItem.valor<=9999.9){
     

           this.person = {
                      valor: this.shoppingItem.valor.toPrecision(6)    
                         }                                 

    }else if(this.shoppingItem.valor<=99999.9){
     

             this.person = {
                        valor: this.shoppingItem.valor.toPrecision(7)    
                           }

            }

            

  }
   editShoppingItem(shoppingItem: ShoppingItem){
     //update our firebase node with new item data
  
     
  
        
         if(Number(this.shoppingItem.valor)>0.99999999999999999){
            
           //this.shoppingItem.valorParcela.toPrecision(3);
      
         if(this.shoppingItem.valor<=9.99){
          
             this.shoppingItem.qtdParcela = this.shoppingItem.qtdParcela-1;
                Number(this.shoppingItem.valor = this.shoppingItem.valor-this.shoppingItem.valorParcela);
                   
         }else if(this.shoppingItem.valor<=99.9){
          
             this.shoppingItem.qtdParcela = this.shoppingItem.qtdParcela-1;
                Number(this.shoppingItem.valor = this.shoppingItem.valor-this.shoppingItem.valorParcela);
                


         }else if(this.shoppingItem.valor<=999.9){
          
             this.shoppingItem.qtdParcela = this.shoppingItem.qtdParcela-1;
                Number(this.shoppingItem.valor = this.shoppingItem.valor-this.shoppingItem.valorParcela);
                

         }else if(this.shoppingItem.valor<=9999.9){
          
             this.shoppingItem.qtdParcela = this.shoppingItem.qtdParcela-1;
                Number(this.shoppingItem.valor = this.shoppingItem.valor-this.shoppingItem.valorParcela);
                                                 

         }else if(this.shoppingItem.valor<=99999.9){
          
              this.shoppingItem.qtdParcela = this.shoppingItem.qtdParcela-1;
                  Number(this.shoppingItem.valor = this.shoppingItem.valor-this.shoppingItem.valorParcela);
            
                 }
              
    

              }if(Number(this.shoppingItem.valor)<=0.99999999999999999){
                this.shoppingItem.tipoDivida="paga";
                  this.shoppingItem.valor=0;
                   this.shoppingItem.valorParcela=0;   

                }
               this.shoppingItemRef$.update(shoppingItem);
                   //send the user back to the shoppingListPage
                   //volta para page lista de dividas
                  
                    this.navCtrl.pop();
        
    }

       ionViewWillLeave(){

      
        //unsubscribe from the observable when leaving the page.
        this.shoppingItemSubscription.unsubscribe();
       }

}
