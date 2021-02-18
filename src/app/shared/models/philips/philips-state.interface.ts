import { PhilipsRoom } from './philips-api.interface';
export interface PhilipsStateModel {
  bridgeIP?: string;
  token?: string;
  rooms?: Partial<PhilipsRoom>[];
}
