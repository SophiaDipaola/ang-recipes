import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ShoppingListService } from '../shopping-list.service';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})

export class ShoppingListEditComponent implements OnInit {
  id: number
  editMode = false
  shoppingForm: FormGroup = new FormGroup({})

  constructor(
    private route: ActivatedRoute,
    private shoppingService: ShoppingListService,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.editMode = params['id'] != null
          this.initForm()
        }
      )
  }

  onSubmit() {
    console.log(this.shoppingForm.value);
    console.log(this.editMode);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.id, this.shoppingForm.value);
      this.router.navigate(['/shopping-list']);
    } else {
      this.shoppingService.addIngredient(this.shoppingForm.value);
    }
    this.onClear();
  }

  onAddIngredient() {
    (this.shoppingForm.get('shoppingList') as FormArray).push(
      new FormGroup({
        name: new FormControl(''),
        amount: new FormControl()
      })
    );
  }

  onClear() {
    this.shoppingForm.reset()
  }

  onDeleteIngredient(index: number) {
    this.shoppingService.deleteIngredient(index)
    this.router.navigate(['/shopping-list'])
  }

  private initForm() {
    let ingredientName = ''
    let ingredientAmount: number
    let newIngredients = new FormArray([])

    if (this.editMode) {
      const ingredient = this.shoppingService.getIngredient(this.id)
      ingredientName = ingredient.name
      ingredientAmount = ingredient.amount
    }

    this.shoppingForm = new FormGroup({
      'name': new FormControl(ingredientName),
      'amount': new FormControl(ingredientAmount),
      'ingredients': newIngredients
    })
  }

  get controls() {
    return (this.shoppingForm.get('shoppingList') as FormArray).controls;
  }
}

