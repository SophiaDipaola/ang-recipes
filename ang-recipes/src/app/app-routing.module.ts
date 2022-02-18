import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipes/recipe-list/recipe-item/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./recipes/recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";

const appRoutes: Routes = [
    {path: '', redirectTo: '/recipes', pathMatch: 'full'},
    {
        // recipe component is a parent component. therefore all routes following are children routes
        path: 'recipes', component: RecipesComponent, children: [
            // all child routes come after the route of the parent route
            { path: '', component: RecipeStartComponent },
            // adding recipes path
            { path: 'new', component: RecipeEditComponent },
            // loading individual recipes by id 
            { path: ':id', component: RecipeDetailComponent },
            // path for editing the recipes 
            { path: ':id/edit', component: RecipeEditComponent }
        ]
    },
    // shopping list is the second parent component
    { path: 'shopping-list', component: ShoppingListComponent }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule{

}