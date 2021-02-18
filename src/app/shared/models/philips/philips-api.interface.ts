export interface PhilipsCreateUser {
  success: {
    username: string;
  };
}

export interface PhilipsLight {
  key: string;
  state: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: [number, number];
    ct: number;
    alert: string;
    colormode: string;
    mode: string;
    reachable: boolean;
  };
  type: string;
  name: string;
  productname: string;
}

export interface PhilipsRoom {
  key: string;
  name: string;
  lights: string[];
  type: string;
  state: {
    all_on: boolean;
    any_on: boolean;
  };
  class: string;
  action?: {
    on: boolean;
    bri: number;
    hue: number;
    sat: number;
    effect: string;
    xy: [number, number];
    ct: number;
    alert: string;
    colormode: string;
  };
}

export interface PhilipsAPIError {
  error: {
    type: number;
    address: string;
    description: string;
  };
}
