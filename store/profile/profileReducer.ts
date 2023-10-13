import { ProfileAction } from "./profileActions";
import { ProfileState, initialState } from "./profileStates";

type KnownAction = ProfileAction;

export default function profileReducer(
  state: ProfileState = initialState,
  action: KnownAction
) {
  switch (action.type) {
    case "SET_PROFILE":
      return { ...state, profile: action.payload }; 

    default:
      return state;
  }
}

