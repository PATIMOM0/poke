import { Injectable } from '@angular/core';
import { openDB, DBSchema } from 'idb';

interface PokemonDB extends DBSchema {
  pokemon: {
    key: string;
    value: any;
  };
}

@Injectable({
  providedIn: 'root'
})
export class IndexedDbServiceService {

  private dbPromise = openDB<PokemonDB>('pokemon-db', 1, {
    upgrade(db) {
      db.createObjectStore('pokemon', { keyPath: 'name' });
    },
  });

  async addPokemon(pokemon: any) {
    const db = await this.dbPromise;
    await db.put('pokemon', pokemon);
  }

  async getPokemon(name: string) {
    const db = await this.dbPromise;
    return db.get('pokemon', name);
  }

  async getAllPokemon() {
    const db = await this.dbPromise;
    return db.getAll('pokemon');
  }

  async clearPokemonData() {
    const db = await this.dbPromise;
    await db.clear('pokemon');
  }
}
