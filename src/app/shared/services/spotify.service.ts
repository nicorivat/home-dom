import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { CurrentlyPlayingObject, SpotifyToken } from '../models';
import { environment } from './../../../environments/environment';

@Injectable()
export class SpotifyService {
  private readonly authUrl = 'https://accounts.spotify.com';
  private readonly apiUrl = 'https://api.spotify.com/v1/me';
  private readonly redirectUrl = encodeURIComponent(
    `${environment.redirectUri}/spotify`
  );
  private readonly scopes = encodeURIComponent(
    'ugc-image-upload user-read-playback-state playlist-read-collaborative user-modify-playback-state user-read-private playlist-modify-public user-library-modify user-top-read playlist-read-private user-follow-read user-read-recently-played playlist-modify-private user-follow-modify user-library-read'
  );

  constructor(
    private readonly httpClient: HttpClient,
    private readonly store: Store
  ) {}

  private tokenHeader(token: SpotifyToken) {
    return {
      headers: {
        Authorization: `${token?.token_type} ${token?.access_token}`,
        'Content-Type': 'application/json',
      },
    };
  }

  private tokenHandler<T>(
    promise: (token: SpotifyToken) => Promise<T>
  ): Promise<T> {
    return new Promise<T>((res, rej) => {
      const { token } = this.store.snapshot()?.configs?.spotify;
      if (!token) {
        return rej(undefined);
      }
      return res(promise(token));
    });
  }

  getAuthorization(clientId: string): void {
    window.location.replace(
      `${this.authUrl}/authorize?client_id=${clientId}&response_type=token&redirect_uri=${this.redirectUrl}&scope=${this.scopes}`
    );
  }

  getCurrentPlayer(): Promise<CurrentlyPlayingObject | undefined> {
    return this.tokenHandler(
      (token: SpotifyToken) =>
        this.httpClient
          .get(`${this.apiUrl}/player`, this.tokenHeader(token))
          .toPromise() as Promise<CurrentlyPlayingObject>
    );
  }

  previousTrack(deviceId: string): Promise<unknown> {
    return this.tokenHandler(
      (token: SpotifyToken) =>
        this.httpClient
          .post(
            `${this.apiUrl}/player/previous?device_id=${deviceId}`,
            undefined,
            this.tokenHeader(token)
          )
          .toPromise() as Promise<CurrentlyPlayingObject>
    );
  }

  togglePlay(isPlaying: boolean, deviceId: string): Promise<unknown> {
    return this.tokenHandler(
      (token: SpotifyToken) =>
        this.httpClient
          .put(
            `${this.apiUrl}/player/${
              isPlaying ? 'pause' : 'play'
            }?device_id=${deviceId}`,
            undefined,
            this.tokenHeader(token)
          )
          .toPromise() as Promise<CurrentlyPlayingObject>
    );
  }

  nextTrack(deviceId: string): Promise<unknown> {
    return this.tokenHandler(
      (token: SpotifyToken) =>
        this.httpClient
          .post(
            `${this.apiUrl}/player/next?device_id=${deviceId}`,
            undefined,
            this.tokenHeader(token)
          )
          .toPromise() as Promise<CurrentlyPlayingObject>
    );
  }
}
