import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SpotifyPlayerComponent } from './spotify-player.component';

@NgModule({
  declarations: [SpotifyPlayerComponent],
  imports: [CommonModule, FlexLayoutModule, FontAwesomeModule],
  exports: [SpotifyPlayerComponent],
})
export class SpotifyPlayerModule {}
