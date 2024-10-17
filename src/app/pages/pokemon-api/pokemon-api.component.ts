import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

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
  displayedColumns: string[] = ['name', 'url'];
  dataSource = new MatTableDataSource<any>();

  constructor(
    private pokemonService: PokemonService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.pokemonService.getPokemonList(50).subscribe((response) => {
        this.dataSource.data = response.results;
      });
    }
  }
}

