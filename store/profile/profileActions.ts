import { Profile } from "../../types";

export interface SetProfileAction {
    type: "SET_PROFILE";
    payload: Profile;
  }
  
  
  export type ProfileAction = SetProfileAction;
  