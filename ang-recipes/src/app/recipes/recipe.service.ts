import { Injectable} from '@angular/core';

import { Recipe } from './ recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
// recipe service is place where we manage our recipes
@Injectable()
export class RecipeService {
  // recipeSelected = new Subject<Recipe[]>()
  recipesChanged = new Subject<Recipe[]>();

  // private so you cant get access to array from the outside
  private recipes: Recipe[] = [ 
    new Recipe('Vegan Ramen ', 'Sumptuous and oozing with flavor, a good bowl of Ramen is pure comfort food. Here is a recipe for Vegan Ramen that is made with a flavorful, rich Miso Shiitake Broth. ', 'https://i.imgur.com/XD2znom.png',
      [new Ingredient('onion', 1),
      new Ingredient('veggie stock', 1),
      new Ingredient('mushrooms', 10),
      new Ingredient('kombu', 2),
      new Ingredient('miso paste', 1),
      new Ingredient('tofu', 1),
      ]),
    new Recipe('Roasted Eggplant with Zaatar', 'Earthy, tangy, Middle Eastern flavors compliment luscious roasted eggplant. A simple, healthy weeknight dinner that will satisfy.', 'https://i.imgur.com/SSvqU1w.png',
      [new Ingredient('eggplant', 1),
      new Ingredient('Zaatar', 1),
      new Ingredient('garlic', 4),
      new Ingredient('rice', 2),
      new Ingredient('cucumber', 1),
      new Ingredient('tomatoe', 1),

      ])
  ];

  constructor(private slService: ShoppingListService) {

  }
  // if we change something in the array then it will return a new array
  getRecipes() {
    return this.recipes.slice()
  }

  getRecipe(index: number) {
    return this.recipes[index]
  }
  // pulling ingredient array from shopping list service
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  addRecipe(recipe:Recipe) {
    this.recipes.push(recipe)
    this.recipesChanged.next(this.recipes.slice())
  }
  
  updateRecipe(index: number, newRecipe:Recipe) {
    this.recipes[index] = newRecipe
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipesChanged.next(this.recipes.slice())
  }
}
