import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'spotify',
    loadChildren: () =>
      import('./pages/spotify/spotify.module').then((m) => m.SpotifyPageModule),
  },
  {
    path: 'philips',
    loadChildren: () =>
      import('./pages/philips/philips.module').then((m) => m.PhilipsPageModule),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
