import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { CurrentlyPlayingObject, SpotifyStateModel } from '../../models';
import { SpotifyService } from '../../services';
import { CommonState } from '../state.utils';
import { SpotifyActions } from './spotify.actions';

@State<SpotifyStateModel>({
  name: 'spotify',
})
@Injectable()
export class SpotifyState extends CommonState {
  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly store: Store
  ) {
    super();
  }

  refreshTokenHandler(status: number): void {
    if (status === 401) {
      const { clientId } = this.store.snapshot()?.configs?.spotify;
      if (clientId) this.spotifyService.getAuthorization(clientId);
    }
  }

  @Action(SpotifyActions.GetCurrentPlayer)
  async getCurrentPlayer(ctx: StateContext<SpotifyStateModel>): Promise<void> {
    try {
      const currentPlayer = await this.spotifyService.getCurrentPlayer();
      ctx.setState({ currentPlayer });
    } catch (e) {
      this.refreshTokenHandler(e?.status);
    }
  }

  @Action(SpotifyActions.PreviousTrack)
  async previousTrack(ctx: StateContext<SpotifyStateModel>): Promise<void> {
    try {
      const currentPlayer: CurrentlyPlayingObject = ctx.getState()
        ?.currentPlayer;
      if (!currentPlayer?.device?.id) {
        throw 'No device id';
      }
      await this.spotifyService.previousTrack(currentPlayer?.device?.id);
    } catch (e) {
      this.refreshTokenHandler(e?.status);
    }
  }

  @Action(SpotifyActions.TogglePlay)
  async togglePlay(ctx: StateContext<SpotifyStateModel>): Promise<void> {
    try {
      const currentPlayer: CurrentlyPlayingObject = ctx.getState()
        ?.currentPlayer;
      if (!currentPlayer?.device?.id) {
        throw 'No device id';
      }
      await this.spotifyService.togglePlay(
        currentPlayer?.is_playing,
        currentPlayer?.device?.id
      );
    } catch (e) {
      this.refreshTokenHandler(e?.status);
    }
  }

  @Action(SpotifyActions.NextTrack)
  async nextTrack(ctx: StateContext<SpotifyStateModel>): Promise<void> {
    try {
      const currentPlayer: CurrentlyPlayingObject = ctx.getState()
        ?.currentPlayer;
      if (!currentPlayer?.device?.id) {
        throw 'No device id';
      }
      await this.spotifyService.nextTrack(currentPlayer?.device?.id);
    } catch (e) {
      this.refreshTokenHandler(e?.status);
    }
  }
}
