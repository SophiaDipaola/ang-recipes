import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';


import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm
  // extablishing to connection to the local input reference for both name and amount
  subscription: Subscription
  editMode = false
// store index of item that is being edited
  editedItemIndex: number
  editedItem: Ingredient
  
  constructor(private slService: ShoppingListService) {

  }

 
  
  
  ngOnInit() {
    this.subscription = this.slService.startedEditing
      .subscribe(
        (index: number) => {
          // getting number of index when start editing
          this.editedItemIndex = index
           // edit mode is true because it will be in edit mode once it starts
          this.editMode = true
           // subscribe to startedEditing subject
          this.editedItem = this.slService.getIngredient(index)
          // reach out to form to assign a new value when when doen editing 
          this.slForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      )
  }

  onSubmit(form: NgForm) {
   
    // pulling the values from the ingredient model to make sure new information is locked in
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if (this.editMode) {
      this.slService.updateIngredient(this.editedItemIndex, newIngredient)
  
    } else {
      this.slService.addIngredient(newIngredient)
    }
    this.editMode = false
    // resetting form after there is a change
    form.reset()
  }
  onClear() {
    this.slForm.reset()
    this.editMode = false
  }
  onDelete() {
    this.slService.deleteIngredient(this.editedItemIndex)
    this.onClear()
  }
  // to clean up subscription to reduce memory leak
  ngOnDestroy() {
    this.subscription.unsubscribe
  }

}
