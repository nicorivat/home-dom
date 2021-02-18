import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { PhilipsService } from '../../services';
import { CommonState } from '../state.utils';
import {
  PhilipsAPIError,
  PhilipsCreateUser,
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
    ctx: StateContext<PhilipsStateModel>,
    { bridgeIP }: PhilipsActions.SetBridgeIP
  ): Promise<void> {
    try {
      const user:
        | PhilipsCreateUser[]
        | PhilipsAPIError[] = await this.philipsService.createUser(bridgeIP);
      if ((user as PhilipsCreateUser[])[0]?.success) {
        ctx.setState({
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
  async getRooms(ctx: StateContext<PhilipsStateModel>): Promise<void> {
    try {
      const { bridgeIP, token } = ctx.getState();
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
              action: undefined,
            }))
            ?.filter((r) => r.type === 'Room') || [];
        if (JSON.stringify(_rooms) !== JSON.stringify(ctx.getState()?.rooms))
          ctx.setState({
            ...ctx.getState(),
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
  async getLights(ctx: StateContext<PhilipsStateModel>): Promise<void> {}

  @Action(PhilipsActions.ToggleRoom)
  async toggleRoom(
    ctx: StateContext<PhilipsStateModel>,
    { room }: PhilipsActions.ToggleRoom
  ): Promise<void> {
    try {
      const { bridgeIP, token } = ctx.getState();
      if (!bridgeIP || !token) {
        this.store.dispatch(new PhilipsActions.APIError());
        return;
      }
      const response:
        | unknown
        | PhilipsAPIError[] = await this.philipsService.toggleRoom(
        bridgeIP,
        token,
        room.key,
        !room.state.any_on
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
