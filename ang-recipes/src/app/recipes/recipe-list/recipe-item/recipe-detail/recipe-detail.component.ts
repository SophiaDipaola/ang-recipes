import { Component, OnInit } from '@angular/core';

import { Recipe } from 'src/app/recipes/ recipe.model';
import { RecipeService } from 'src/app/recipes/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  // this allows any component to use the recipe property which is derived from the Recipe model
recipe: Recipe
  id: number
  
  constructor(private recipeService: RecipeService,
    // the activated route contains the information about the route associated with the component loaded in an outlet
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // use route and subscribe to observable
    this.route.params
      .subscribe(
        (params: Params) => {
          // will pass as a string so plus sign is to load the id as a number
          this.id = +params['id']
          // fetch recipe whenever the id changes
          this.recipe = this.recipeService.getRecipe(this.id)
        }
      )
  }

  onAddToShoppingList() {
    // adding the ingredients retrieved from recipe 
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'],{relativeTo: this.route} )
  }
  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['/recipes'])
  }
}
