import { PhilipsAPIError, PhilipsRoom } from '../../models';

export namespace PhilipsActions {
  export class SetBridgeIP {
    static readonly type = '[PHILIPS - SET BRIDGE IP] Set bridge IP';
    constructor(public readonly bridgeIP: string) {}
  }

  export class GetRooms {
    static readonly type = '[PHILIPS - GET ROOMS] Get rooms';
  }

  export class GetLights {
    static readonly type = '[PHILIPS - GET LIGHTS] Get lights';
  }

  export class SetCurrentRoom {
    static readonly type = '[PHILIPS - SET CURRENT ROOM] Set current room';
    constructor(public readonly currentRoom: PhilipsRoom) {}
  }

  export class ToggleRoom {
    static readonly type = '[PHILIPS - TOGGLE ROOM] Toggle room';
    constructor(public readonly key: string, public readonly on: boolean) {}
  }

  export class ToggleLight {
    static readonly type = '[PHILIPS - TOGGLE LIGHT] Toggle light';
    constructor(public readonly key: string, public readonly on: boolean) {}
  }

  export class APIError {
    static readonly type = '[PHILIPS - API ERROR] API error';
    constructor(public readonly error?: PhilipsAPIError[]) {}
  }
}
