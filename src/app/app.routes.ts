import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { CreateRecipeComponent } from './components/create-recipe/create-recipe.component';
import { MyRecipesComponent } from './components/my-recipes/my-recipes.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { SavedRecipesComponent } from './components/saved-recipes/saved-recipes.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signUp', component: SignUpComponent },
    { path: 'edit-profile', component: EditProfileComponent },
    { path: 'recipe/:id', component: RecipeComponent },
    { path: 'my-recipes', component: MyRecipesComponent },
    { path: 'create-recipe', component: CreateRecipeComponent },
    { path: 'edit-recipe', component: EditRecipeComponent, },
    { path: 'saved-recipes', component: SavedRecipesComponent, },
    { path: '**', component: PageNotFoundComponent }
];
