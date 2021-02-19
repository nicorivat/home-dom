import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { ConfigsStateModel } from '../../models';
import { CommonState } from './../state.utils';
import { ConfigsActions } from './configs.actions';

@State<ConfigsStateModel>({
  name: 'configs',
  defaults: {
    spotify: {},
    language: 'gb',
  },
})
@Injectable()
export class ConfigsState extends CommonState {
  @Action(ConfigsActions.SetSpotifyConfig)
  setSpotifyConfig(
    { getState, setState }: StateContext<ConfigsStateModel>,
    { spotify }: ConfigsActions.SetSpotifyConfig
  ): void {
    const state = this.copyState(getState());
    setState({
      ...state,
      spotify: {
        ...state.spotify,
        ...spotify,
      },
    });
  }

  @Action(ConfigsActions.SetLanguage)
  setLanguage(
    { getState, setState }: StateContext<ConfigsStateModel>,
    { language }: ConfigsActions.SetLanguage
  ): void {
    setState({
      ...getState(),
      language,
    });
  }
}
