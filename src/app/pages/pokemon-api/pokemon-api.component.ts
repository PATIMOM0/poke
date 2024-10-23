import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IndexedDbServiceService } from '../../services/indexed-db-service.service';

@Component({
  selector: 'app-pokemon-api',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatTableModule
  ],
  templateUrl: './pokemon-api.component.html',
  styleUrl: './pokemon-api.component.css'
})
export class PokemonAPIComponent {
  displayedColumns: string[] = ['name', 'image', 'height', 'weight', 'url'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private pokemonService: PokemonService,
    private indexedDbService: IndexedDbServiceService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (navigator.onLine) {
        // Si hay conexión a internet, obtener los datos desde la API
        this.pokemonService.getPokemonList(50).subscribe((response) => {
          const pokemons = response.results;

          pokemons.forEach((pokemon: any) => {
            this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details) => {
              pokemon.image = details.sprites.front_default;
              pokemon.height = details.height;
              pokemon.weight = details.weight;

              // Almacenar los datos en IndexedDB
              this.indexedDbService.addPokemon(pokemon);

              // Actualizar la tabla
              this.dataSource.data = [...pokemons];
            });
          });
        });
      } else {
        // Si no hay conexión a internet, obtener los datos desde IndexedDB
        this.indexedDbService.getAllPokemon().then((pokemons) => {
          if (pokemons.length > 0) {
            this.dataSource.data = pokemons;
          } else {
            console.log('No hay datos en IndexedDB');
          }
        });
      }
    }

    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('online', () => this.updatePokemonData());
      window.addEventListener('offline', () => this.loadPokemonFromIndexedDb());
      this.loadPokemonFromIndexedDb(); // Cargar datos de IndexedDB al iniciar
    }
  }

  updatePokemonData() {
    this.pokemonService.getPokemonList(50).subscribe((response) => {
      const pokemons = response.results;

      pokemons.forEach((pokemon: any) => {
        this.pokemonService.getPokemonDetails(pokemon.name).subscribe((details) => {
          pokemon.image = details.sprites.front_default;
          pokemon.height = details.height;
          pokemon.weight = details.weight;

          this.indexedDbService.addPokemon(pokemon);
          this.dataSource.data = [...pokemons];
        });
      });
    });
  }

  loadPokemonFromIndexedDb() {
    this.indexedDbService.getAllPokemon().then((pokemons) => {
      this.dataSource.data = pokemons;
    });
  }
}

