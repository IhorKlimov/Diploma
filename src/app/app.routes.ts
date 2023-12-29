import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecipeComponent } from './recipe/recipe.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "recipe/:id", component: RecipeComponent },
    { path: "login", component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];
