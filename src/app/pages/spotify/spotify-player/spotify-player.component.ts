import { Component } from '@angular/core';
import {
  faBackward,
  faForward,
  faPause,
  faPlay,
  IconDefinition
} from '@fortawesome/free-solid-svg-icons';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AlbumObjectSimplified,
  CurrentlyPlayingObject,
  DestroyableComponent,
  SpotifyActions,
  SpotifyState,
  TrackObjectFull
} from './../../../shared';

@Component({
  selector: 'hd-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.scss'],
})
export class SpotifyPlayerComponent extends DestroyableComponent {
  @Select(SpotifyState.getState(['currentPlayer']))
  currentPlayer$!: Observable<CurrentlyPlayingObject>;

  playIcon: IconDefinition = faPlay;
  pauseIcon: IconDefinition = faPause;
  nextIcon: IconDefinition = faForward;
  prevIcon: IconDefinition = faBackward;

  constructor(private readonly store: Store) {
    super();
  }

  getAlbumImage(album?: AlbumObjectSimplified): string {
    return album?.images[1].url || '';
  }

  getArtistName(item?: TrackObjectFull | null | undefined): string {
    return item?.artists[0]?.name || '';
  }

  previousTrack(): void {
    this.store.dispatch(new SpotifyActions.PreviousTrack());
  }

  togglePlay(): void {
    this.store.dispatch(new SpotifyActions.TogglePlay());
  }

  nextTrack(): void {
    this.store.dispatch(new SpotifyActions.NextTrack());
  }
}
