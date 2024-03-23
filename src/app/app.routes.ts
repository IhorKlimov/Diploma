import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RecipeComponent } from './pages/recipe/recipe.component';
import { LoginComponent } from './pages/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { CreateRecipeComponent } from './pages/create-recipe/create-recipe.component';
import { MyRecipesComponent } from './pages/my-recipes/my-recipes.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { EditRecipeComponent } from './pages/edit-recipe/edit-recipe.component';
import { SavedRecipesComponent } from './pages/saved-recipes/saved-recipes.component';

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
