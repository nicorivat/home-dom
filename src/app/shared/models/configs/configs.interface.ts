export interface ConfigsStateModel {
  spotify?: SpotifyConfig;
}

export interface SpotifyConfig {
  token?: SpotifyToken;
  clientId?: string;
  tmpClientId?: string;
}

export interface SpotifyToken {
  access_token: string;
  token_type: string;
}
