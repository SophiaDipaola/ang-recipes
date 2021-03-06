import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params,Router } from '@angular/router';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // retreive id of recipe that is being edited 
          this.id = +params['id']
          this.editMode = params['id'] != null
          this.initForm()
      }
    )
  }
  onSubmit() {
    
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null),
        'amount': new FormControl(null)
     })
   )
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo:this.route})
  }

  onDeleteIngredient(index:number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  private initForm() {
    let recipeName = ''
    let recipeImagePath = ''
    let recipeDescription = ''
    let recipeIngredients = new FormArray([])

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id)
      recipeName = recipe.name
      recipeImagePath = recipe.imagePath
      recipeDescription = recipe.description
      // checking if there are ingredients present in the recipe
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            // creating a new form group for new array of ingredients
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount)
            })
          )}
      }
      
    }

    // taking the js object where the key value pairs for the controls
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(recipeImagePath),
      'description': new FormControl(recipeDescription),
      'ingredients': recipeIngredients
    })
  }

  get controls() { // a getter
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

}
