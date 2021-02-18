export namespace SpotifyActions {
  export class GetCurrentPlayer {
    static readonly type = '[SPOTIFY - GET CURRENT PLAYER] Get current player';
  }

  export class PreviousTrack {
    static readonly type = '[SPOTIFY - PREVIOUS TRACK] Previous track';
  }

  export class TogglePlay {
    static readonly type = '[SPOTIFY - TOGGLE PLAY] Toggle play / pause';
  }

  export class NextTrack {
    static readonly type = '[SPOTIFY - NEXT TRACK] Next track';
  }
}
