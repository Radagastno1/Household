import { Profile } from "../../types";

export interface ProfileState {
  profile: Profile;
}

export const initialState: ProfileState = {
  profile: {
    id: "",
    profileName: "",
    userId: "",
    householdId: "",
    avatar: "",
    isOwner: false,
    isActive: false,
  },
};

  