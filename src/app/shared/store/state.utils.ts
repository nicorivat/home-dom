import { createSelector } from '@ngxs/store';

export class CommonState {
  // Select state with a array of string that defines the path (ex: @Select(CoreState.getState(['isAuthenticated'])))
  static getState(type: string[] = []): any {
    return createSelector([this.prototype.constructor], (state: string[]) => {
      let value = state;
      type.forEach(e => value = (value as any)[e]);
      return value;
    });
  }

  // Use this method instead of directly play with the state references
  copyState<T extends {}>(state: T) {
    return { ...state };
  }

  // Serialize state to base64
  public static base64Serializer(stateToSerialize: any) {
    return btoa(JSON.stringify(stateToSerialize));
  }

  // Deserialize state from base64
  public static base64Deserializer(stateToDeserialize: string) {
    return JSON.parse(atob(stateToDeserialize));
  }
}