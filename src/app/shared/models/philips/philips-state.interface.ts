import { PhilipsLight, PhilipsRoom } from './philips-api.interface';
export interface PhilipsStateModel {
  bridgeIP?: string;
  token?: string;
  rooms?: PhilipsRoom[];
  currentRoom?: PhilipsRoom;
  lights?: PhilipsLight[];
}
