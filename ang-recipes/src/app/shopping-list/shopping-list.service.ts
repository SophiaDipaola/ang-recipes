
import { Ingredient } from '../shared/ingredient.model';
import { __spreadArray } from 'tslib';
import { Subject } from 'rxjs';


export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
  
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 10),
    new Ingredient('oragnes', 40)
  ]

  // fetch ingredient at the specific index
  getIngredient(index:number) {
  return this.ingredients[index]
}
  getIngredients() {
    return this.ingredients.slice()
  }
  // access ingredients and push new ingredient on it 
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  // turn array of ingredients into a list 
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    // emit that our ingredients changed
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  // getting index of ingredient that needs to updated and the new ingredient
  updateIngredient(index: number, newIngredient: Ingredient) {
    // reach out to ingredients and find the one with the number im looking for 
    this.ingredients[index] = newIngredient
    // emit updated ingredient 
    this.ingredientsChanged.next(this.ingredients.slice())
  }
  // getting the index where to delete
  deleteIngredient(index: number) {
    // splicing ingredients array to remove one item
    this.ingredients.splice(index, 1)
    this.ingredientsChanged.next(this.ingredients.slice())
  }
}
