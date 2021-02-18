import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ConfigsStateModel } from '../../models';
import { CommonState } from './../state.utils';
import { ConfigsActions } from './configs.actions';

@State<ConfigsStateModel>({
  name: 'configs',
  defaults: {
    spotify: {},
  },
})
@Injectable()
export class ConfigsState extends CommonState {
  @Action(ConfigsActions.SetSpotifyConfig)
  setSpotifyConfig(
    ctx: StateContext<ConfigsStateModel>,
    { spotify }: ConfigsActions.SetSpotifyConfig
  ): void {
    const state = this.copyState(ctx.getState());
    ctx.setState({
      ...state,
      spotify: {
        ...state.spotify,
        ...spotify,
      },
    });
  }
}
