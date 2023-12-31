import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RecipeComponent } from './components/recipe/recipe.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "recipe/:id", component: RecipeComponent },
    { path: "login", component: LoginComponent },
    { path: '**', component: PageNotFoundComponent }
];
