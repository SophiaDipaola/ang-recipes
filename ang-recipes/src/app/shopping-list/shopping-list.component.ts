import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[]
  private subscription: Subscription

  constructor(
    public shoppingService: ShoppingListService,
    private router: Router,

  ) { }

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients()
    this.subscription = this.shoppingService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients
        }
      )
  }

  onEditItem(index) {
    this.router.navigate(['/shopping-list', index])
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
