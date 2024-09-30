import { Component } from '@angular/core';
import { ModulesModule } from '../../modules/modules.module';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

interface Receta {
  titulo: string;
  descripcion: string;
  ingredientes: string[];
  pasos: string[];
}

@Component({
  selector: 'app-recetario',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './recetario.component.html',
  styleUrl: './recetario.component.css'
})
export class RecetarioComponent {

  recetas:  Receta[] = [
    {
      titulo: 'Spagetti',
      descripcion: 'Una deliciosa pasta con salsa pesto casera',
      ingredientes: ['500g de pasta', '2 tazas de albahaca fresca', '1/2 taza de piñones', '2 dientes de ajo', '1/2 taza de aceite de oliva', 'Sal y pimienta al gusto'],
      pasos: [
        'Cocinar la pasta según las instrucciones del paquete',
        'Mezclar en un procesador la albahaca, piñones, ajo, sal y pimienta',
        'Agregar el aceite de oliva mientras se procesa',
        'Mezclar el pesto con la pasta cocida'
      ]
    },{
      titulo: 'Ensalada César',
      descripcion: 'Una clásica ensalada César con aderezo casero',
      ingredientes: ['1 lechuga romana', '100g de pan para croutones', '50g de queso parmesano', '2 huevos', '2 dientes de ajo', '1 limón', '1 cucharada de mostaza', 'Aceite de oliva', 'Sal y pimienta'],
      pasos: [
        'Lavar y cortar la lechuga en trozos',
        'Hacer los croutones dorando el pan en cubos con aceite y ajo',
        'Preparar el aderezo mezclando yemas, ajo, mostaza, jugo de limón, aceite, sal y pimienta',
        'Mezclar la lechuga con el aderezo, añadir croutones y queso rallado'
      ]
    },
    {
      titulo: 'Guacamole',
      descripcion: 'Un sabroso dip mexicano de aguacate',
      ingredientes: ['3 aguacates maduros', '1 tomate', '1/2 cebolla', '1 chile jalapeño', '1 limón', 'Cilantro fresco', 'Sal al gusto'],
      pasos: [
        'Machacar los aguacates en un bowl',
        'Picar finamente el tomate, la cebolla, el jalapeño y el cilantro',
        'Mezclar todos los ingredientes con el aguacate',
        'Agregar el jugo de limón y sal al gusto',
        'Servir con totopos o chips de maíz'
      ]
    }
    // Puedes agregar más recetas aquí
  ];
}
