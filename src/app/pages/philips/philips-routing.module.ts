import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { PhilipsPageComponent } from './philips.page';

const routes: Route[] = [
  {
    path: '',
    component: PhilipsPageComponent,
  },
  {
    path: 'room',
    loadChildren: () =>
      import('./pages/room/room.module').then((m) => m.RoomPageModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhilipsRoutingModule {}
