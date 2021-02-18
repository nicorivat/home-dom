import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { take, takeUntil, tap } from 'rxjs/operators';
import {
  ConfigsActions,
  ConfigsState,
  DestroyableComponent,
  SpotifyActions,
  SpotifyConfig,
  SpotifyService,
  SpotifyState
} from '../../shared';
import { CurrentlyPlayingObject } from './../../shared';

@Component({
  selector: 'hd-spotify-page',
  templateUrl: './spotify.page.html',
  styleUrls: ['./spotify.page.scss'],
})
export class SpotifyPageComponent
  extends DestroyableComponent
  implements OnInit {
  @Select(ConfigsState.getState(['spotify']))
  spotifyConfig$!: Observable<SpotifyConfig>;

  @Select(SpotifyState.getState(['currentPlayer']))
  currentPlayer$!: Observable<CurrentlyPlayingObject>;

  playerInterval!: NodeJS.Timeout;
  translatePath = 'spotify.';

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute,
    private readonly spotifyService: SpotifyService
  ) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.fragment
      .pipe(
        takeUntil(this.destroy$),
        tap(async (fragment) => {
          const params = new URLSearchParams(fragment);
          let spotifyConfig: SpotifyConfig | undefined;
          this.spotifyConfig$
            .pipe(
              take(1),
              tap((_spotifyConfig) => (spotifyConfig = _spotifyConfig))
            )
            .subscribe();
          if (params.get('access_token')) {
            this.store.dispatch(
              new ConfigsActions.SetSpotifyConfig({
                clientId: spotifyConfig?.clientId || spotifyConfig?.tmpClientId,
                tmpClientId: undefined,
                token: {
                  access_token: params.get('access_token') as string,
                  token_type: params.get('token_type') as string,
                },
              })
            );
          } else if (params.get('error')) {
            // HANDLE ERRORS
          } else {
            if (spotifyConfig?.clientId && !spotifyConfig?.token)
              this.spotifyService.getAuthorization(spotifyConfig.clientId);
          }
        })
      )
      .subscribe();
    this.spotifyConfig$
      .pipe(
        takeUntil(this.destroy$),
        tap((spotifyConfig) => {
          if (spotifyConfig?.token) {
            this.store.dispatch(SpotifyActions.GetCurrentPlayer);
            this.playerInterval = setInterval(
              () => this.store.dispatch(SpotifyActions.GetCurrentPlayer),
              1000
            );
          }
        })
      )
      .subscribe();
  }

  OnDestroy() {
    clearInterval(this.playerInterval);
  }
}
