import { SpotifyConfig } from '../../models';

export namespace ConfigsActions {
  export class SetSpotifyConfig {
    static readonly type = '[CONFIGS - SET SPOTIFY CONFIG] Set spotify config';
    constructor(public readonly spotify: Partial<SpotifyConfig>) {}
  }

  export class ShowConfigModal {
    static readonly type = '[CONFIGS - SHOW CONFIG MODAL] Show config modal';
  }

  export class SetLanguage {
    static readonly type = '[CONFIGS - SET LANGUAGE] Set language';
    constructor(public readonly language: string) {}
  }
}
