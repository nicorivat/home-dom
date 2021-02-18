import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxsModule } from '@ngxs/store';
import { SpotifyService, SpotifyState } from '../../shared';
import { SpotifyClientIdModalModule } from './clientId-modal';
import { SpotifyPlayerModule } from './spotify-player';
import { SpotifyPageComponent } from './spotify.page';

@NgModule({
  declarations: [SpotifyPageComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    TranslateModule,
    SpotifyPlayerModule,
    SpotifyClientIdModalModule,
    NgxsModule.forFeature([SpotifyState]),
    RouterModule.forChild([{ path: '', component: SpotifyPageComponent }]),
  ],
  providers: [SpotifyService],
  exports: [SpotifyPageComponent],
})
export class SpotifyPageModule {}
