import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { PhilipsService } from '../../services';
import { CommonState } from '../state.utils';
import {
  PhilipsAPIError,
  PhilipsCreateUser,
  PhilipsLight,
  PhilipsRoom,
  PhilipsStateModel
} from './../../models';
import { PhilipsActions } from './philips.actions';

@State<PhilipsStateModel>({
  name: 'philips',
})
@Injectable()
export class PhilipsState extends CommonState {
  constructor(
    private readonly philipsService: PhilipsService,
    private readonly store: Store
  ) {
    super();
  }

  @Action(PhilipsActions.SetBridgeIP)
  async setBridgeIP(
    { setState }: StateContext<PhilipsStateModel>,
    { bridgeIP }: PhilipsActions.SetBridgeIP
  ): Promise<void> {
    try {
      const user:
        | PhilipsCreateUser[]
        | PhilipsAPIError[] = await this.philipsService.createUser(bridgeIP);
      if ((user as PhilipsCreateUser[])[0]?.success) {
        setState({
          bridgeIP,
          token: (user as PhilipsCreateUser[])[0]?.success?.username,
        });
      } else
        this.store.dispatch(
          new PhilipsActions.APIError(user as PhilipsAPIError[])
        );
    } catch (e) {
      this.store.dispatch(new PhilipsActions.APIError(e as PhilipsAPIError[]));
    }
  }

  @Action(PhilipsActions.GetRooms)
  async getRooms({
    getState,
    setState,
  }: StateContext<PhilipsStateModel>): Promise<void> {
    try {
      const { bridgeIP, token } = getState();
      if (!bridgeIP || !token) {
        this.store.dispatch(new PhilipsActions.APIError());
        return;
      }
      const rooms:
        | { [key: string]: PhilipsRoom }
        | PhilipsAPIError[] = await this.philipsService.getRooms(
        bridgeIP,
        token
      );
      if (!(rooms as PhilipsAPIError[])?.length) {
        const _rooms =
          Object.keys(rooms)
            ?.map((key: string) => ({
              ...((rooms as { [key: string]: PhilipsRoom })[
                key
              ] as PhilipsRoom),
              key,
            }))
            ?.filter((r) => r.type === 'Room') || [];
        setState({
          ...getState(),
          rooms: _rooms,
        });
      } else {
        this.store.dispatch(
          new PhilipsActions.APIError(rooms as PhilipsAPIError[])
        );
      }
    } catch (e) {
      this.store.dispatch(new PhilipsActions.APIError(e as PhilipsAPIError[]));
    }
  }

  @Action(PhilipsActions.GetLights)
  async getLights({
    getState,
    setState,
  }: StateContext<PhilipsStateModel>): Promise<void> {
    try {
      const { bridgeIP, token } = getState();
      if (!bridgeIP || !token) {
        this.store.dispatch(new PhilipsActions.APIError());
        return;
      }
      const lights:
        | { [key: string]: PhilipsLight }
        | PhilipsAPIError[] = await this.philipsService.getLights(
        bridgeIP,
        token
      );
      if (!(lights as PhilipsAPIError[])?.length) {
        const _lights =
          Object.keys(lights)
            ?.map((key: string) => ({
              ...((lights as { [key: string]: PhilipsLight })[
                key
              ] as PhilipsLight),
              key,
            }))
            ?.filter((l) => getState()?.currentRoom?.lights?.includes(l.key)) ||
          [];
        setState({
          ...getState(),
          lights: _lights,
        });
      } else {
        this.store.dispatch(
          new PhilipsActions.APIError(lights as PhilipsAPIError[])
        );
      }
    } catch (e) {
      this.store.dispatch(new PhilipsActions.APIError(e as PhilipsAPIError[]));
    }
  }

  @Action(PhilipsActions.SetCurrentRoom)
  setCurrentRoom(
    { getState, setState }: StateContext<PhilipsStateModel>,
    { currentRoom }: PhilipsActions.SetCurrentRoom
  ): void {
    setState({
      ...getState(),
      currentRoom,
    });
  }

  @Action(PhilipsActions.ToggleRoom)
  async toggleRoom(
    { getState }: StateContext<PhilipsStateModel>,
    { key, on }: PhilipsActions.ToggleRoom
  ): Promise<void> {
    try {
      const { bridgeIP, token } = getState();
      if (!bridgeIP || !token) {
        this.store.dispatch(new PhilipsActions.APIError());
        return;
      }
      const response:
        | unknown
        | PhilipsAPIError[] = await this.philipsService.toggleRoom(
        bridgeIP,
        token,
        key,
        on
      );
      if (
        (response as PhilipsAPIError[])?.length > 0 &&
        (response as PhilipsAPIError[])[0]?.error
      ) {
        this.store.dispatch(
          new PhilipsActions.APIError(response as PhilipsAPIError[])
        );
      }
    } catch (e) {
      this.store.dispatch(new PhilipsActions.APIError(e as PhilipsAPIError[]));
    }
  }

  @Action(PhilipsActions.ToggleLight)
  async toggleLight(
    { getState }: StateContext<PhilipsStateModel>,
    { key, on }: PhilipsActions.ToggleLight
  ): Promise<void> {
    try {
      const { bridgeIP, token } = getState();
      if (!bridgeIP || !token) {
        this.store.dispatch(new PhilipsActions.APIError());
        return;
      }
      const response:
        | unknown
        | PhilipsAPIError[] = await this.philipsService.toggleLight(
        bridgeIP,
        token,
        key,
        on
      );
      if (
        (response as PhilipsAPIError[])?.length > 0 &&
        (response as PhilipsAPIError[])[0]?.error
      ) {
        this.store.dispatch(
          new PhilipsActions.APIError(response as PhilipsAPIError[])
        );
      }
    } catch (e) {
      this.store.dispatch(new PhilipsActions.APIError(e as PhilipsAPIError[]));
    }
  }
}
