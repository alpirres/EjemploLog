import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate:[AuthGuardService]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  { 
    path: 'register', 
    loadChildren: () => import('./register/register.module').then(m=> m.RegisterPageModule)
  },
  {
    path: 'reserva/:m',
    loadChildren: () => import('./reserva/reserva.module').then( m => m.ReservaPageModule)
  },
  {
    path: 'geolocate',
    loadChildren: () => import('./geolocate/geolocate.module').then( m => m.GeolocatePageModule)
  },
  {
    path: 'list-reservas',
    loadChildren: () => import('./list-reservas/list-reservas.module').then( m => m.ListReservasPageModule)
  },
  {
    path:'**',
    redirectTo: ''
  },
  
  
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
