import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ModulesModule } from './modules/modules.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    RouterOutlet,
    RouterModule,
    ModulesModule
  ]
})
export class AppComponent implements OnInit {
  private deferredPrompt: any;

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    // Verificar si la aplicación está instalada en modo standalone
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (!isStandalone) {
      // Si no está en modo standalone, eliminar el estado de instalación guardado
      localStorage.removeItem('appInstalled');
    }

    // Revisar si la app ya está instalada
    const isAppInstalled = localStorage.getItem('appInstalled');

    if (!isAppInstalled) {
      // Si no está instalada, escuchar el evento 'beforeinstallprompt'
      window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        this.deferredPrompt = event;
        this.showInstallSnackBar();
      });
    }

    // Detectar cuándo la app se instala
    window.addEventListener('appinstalled', () => {
      console.log('App instalada');
      localStorage.setItem('appInstalled', 'true'); // Guardar estado de instalación
    });
  }

  showInstallSnackBar() {
    const snackBarRef = this.snackBar.open('¿Quieres instalar la app?', 'Instalar', {
      duration: 10000,
      verticalPosition: 'top', // Cambia la posición vertical a "top"
      horizontalPosition: 'center',
    });

    snackBarRef.onAction().subscribe(() => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó la instalación');
          } else {
            console.log('Usuario rechazó la instalación');
          }
          this.deferredPrompt = null;
        });
      }
    });
  }
}
