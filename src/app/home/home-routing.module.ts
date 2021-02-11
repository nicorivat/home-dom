import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomePageComponent } from './home.page';

const routes: Route[] = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'spotify',
    loadChildren: () =>
      import('./pages/spotify/spotify.module').then((m) => m.SpotifyPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
