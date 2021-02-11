import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { SpotifyPageComponent } from './spotify.page';

@NgModule({
  declarations: [SpotifyPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule.forChild([{ path: '', component: SpotifyPageComponent }]),
  ],
  exports: [SpotifyPageComponent],
})
export class SpotifyPageModule {}
