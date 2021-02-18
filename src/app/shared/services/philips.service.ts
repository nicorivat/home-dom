import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PhilipsAPIError, PhilipsCreateUser, PhilipsRoom } from './../models';

@Injectable()
export class PhilipsService {
  constructor(private readonly httpClient: HttpClient) {}

  private constructBridgeApi(bridgeIP: string): string {
    return `https://${bridgeIP}/api`;
  }

  createUser(
    bridgeIP: string
  ): Promise<PhilipsCreateUser[] | PhilipsAPIError[]> {
    return this.httpClient
      .post(this.constructBridgeApi(bridgeIP), {
        devicetype: 'home-dom',
      })
      .toPromise() as Promise<PhilipsCreateUser[] | PhilipsAPIError[]>;
  }

  getRooms(
    bridgeIP: string,
    token: string
  ): Promise<{ [key: string]: PhilipsRoom } | PhilipsAPIError[]> {
    return this.httpClient
      .get(`${this.constructBridgeApi(bridgeIP)}/${token}/groups`)
      .toPromise() as Promise<
      { [key: string]: PhilipsRoom } | PhilipsAPIError[]
    >;
  }

  toggleRoom(
    bridgeIP: string,
    token: string,
    key: string,
    on: boolean
  ): Promise<unknown | PhilipsAPIError> {
    return this.httpClient
      .put(
        `${this.constructBridgeApi(bridgeIP)}/${token}/groups/${key}/action`,
        { on }
      )
      .toPromise() as Promise<unknown | PhilipsAPIError>;
  }
}
