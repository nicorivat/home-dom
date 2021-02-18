import { SpotifyConfig } from '../../models';

export namespace ConfigsActions {
  export class SetSpotifyConfig {
    static readonly type = '[CONFIGS - SET SPOTIFY CONFIG] Set spotify config';
    constructor(public readonly spotify: Partial<SpotifyConfig>) {}
  }
}
