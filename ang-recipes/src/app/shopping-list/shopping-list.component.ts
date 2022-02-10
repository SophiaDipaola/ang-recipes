import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // establishing ingredient array and locking it in by connecting it to the model object
  ingredients: Ingredient[]
  private subscription: Subscription

  // providing the shopping list service 
  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients()
    this.subscription = this.slService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients
        }
      )
  }
  // will insure that we pass on the index to our subject so it can listen to it in the sophing edit component
  onEditItem(index: number) {
    this.slService.startedEditing.next(index)
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
