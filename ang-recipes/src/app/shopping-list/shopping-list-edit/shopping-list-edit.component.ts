import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
// import { Subscription } from 'rxjs';
// import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})

export class ShoppingListEditComponent implements OnInit {
  shoppingForm = new FormGroup({
    name: new FormControl(),
    amount: new FormControl('')

  })
  constructor(private route: ActivatedRoute,
    private slService: ShoppingListService,
    private router: Router) {

  }
  ngOnInit() {

  }

}

// export class RecipeEditComponent implements OnInit {
//   id: number
//   editMode = false
//   shoppingForm: FormGroup

//   constructor(private route: ActivatedRoute,
//     private ShoppingListService: slService,
//     private router: Router) { }

//   ngOnInit() {
//     this.route.params
//       .subscribe(
//         (params: Params) => {
//           this.id = +params['id']
//           this.editMode = params['id'] != null
//           this.initForm()
//         }
//       )
//   }
//   onSubmit() {

//     if (this.editMode) {
//       this.recipeService.updateRecipe(this.id, this.recipeForm.value)
//     } else {
//       this.recipeService.addRecipe(this.recipeForm.value)
//     }
//     this.onCancel()
//   }

//   onAddIngredient() {
//     (<FormArray>this.recipeForm.get('ingredients')).push(
//       new FormGroup({
//         'name': new FormControl(null),
//         'amount': new FormControl(null)
//       })
//     )
//   }

//   onCancel() {
//     this.router.navigate(['../'], { relativeTo: this.route })
//   }

//   onDeleteIngredient(index: number) {
//     (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
//   }

//   private initForm() {
//     let recipeName = ''
//     let recipeImagePath = ''
//     let recipeDescription = ''
//     let recipeIngredients = new FormArray([])

//     if (this.editMode) {
//       const recipe = this.recipeService.getRecipe(this.id)
//       recipeName = recipe.name
//       recipeImagePath = recipe.imagePath
//       recipeDescription = recipe.description

//       if (recipe['ingredients']) {
//         for (let ingredient of recipe.ingredients) {
//           recipeIngredients.push(
//             new FormGroup({
//               'name': new FormControl(ingredient.name),
//               'amount': new FormControl(ingredient.amount)
//             })
//           )
//         }
//       }

//     }


//     this.recipeForm = new FormGroup({
//       'name': new FormControl(recipeName),
//       'imagePath': new FormControl(recipeImagePath),
//       'description': new FormControl(recipeDescription),
//       'ingredients': recipeIngredients
//     })
//   }

//   get controls() {
//     return (<FormArray>this.recipeForm.get('ingredients')).controls;
//   }

// }

// export class ShoppingListEditComponent implements OnInit, OnDestroy {
//   @ViewChild('shoppingListForm') slForm: NgForm
//   shoppingForm: FormGroup
//   subscription: Subscription
//   editMode = false

//   editedItemIndex: number
//   editedItem: Ingredient

//   constructor(private slService: ShoppingListService) {

//   }




//   ngOnInit() {
//     this.subscription = this.slService.startedEditing
//       .subscribe(
//         (index: number) => {
//           this.editedItemIndex = index
//           this.editMode = true
//           this.editedItem = this.slService.getIngredient(index)
//           this.slForm.setValue({
//             name: this.editedItem.name,
//             amount: this.editedItem.amount
//           })
//         }
//       )
//   }

//   onSubmit(form: NgForm) {
//     const value = form.value
//     const newIngredient = new Ingredient(value.name, value.amount)
//     if (this.editMode) {
//       this.slService.updateIngredient(this.editedItemIndex, newIngredient)
//     } else {
//       this.slService.addIngredient(newIngredient)
//     }
//     this.editMode = false
//     form.reset()
//   }
//   onClear() {
//     this.slForm.reset()
//     this.editMode = false
//   }
//   onDelete() {
//     this.slService.deleteIngredient(this.editedItemIndex)
//     this.onClear()
//   }

//   ngOnDestroy() {
//     this.subscription.unsubscribe
//   }

// }

// this.shoppingForm = new FormGroup({
//   'name': new FormControl(shoppingName),
//   'amount': new FormControl(shoppingAmount),

// })
//   }

