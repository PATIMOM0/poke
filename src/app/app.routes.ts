import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecetarioComponent } from './components/recetario/recetario.component';
import { PokemonAPIComponent } from './pages/pokemon-api/pokemon-api.component';

export const routes: Routes = [
  {path: 'api', component: PokemonAPIComponent},
  {path: 'recetario', component: RecetarioComponent},
  {path: '**', component: HomeComponent}
];
