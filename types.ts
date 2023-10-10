export interface User {
  id: string;
  name: string;
  username: string;
  password: string;
  isOwner: boolean;
  isActive: boolean;
}

export interface HouseholdUserModel {
  userId: string;
  householdId: string;
  avatarId: string;
}

export interface Household {
  id: string;
  name: string;
  code: string;
}

//fråga david
export interface Task {
  id: string;
  name: string;
  description: string;
  energiWeight: number;
  startDate: Date; //default blir dagens datum
  interval: number; //dagar emellan?
  isDone: boolean;
  householdId: string;
}

export interface Avatar {
  id: string;
  symbol: string; //url
  color: string;
}

// fråga david
// hushåll och user är many to many
// task och user är many to many

//user can have multiple households and avatars
//household can have multiple users

//user_to_household - table  fråga om denna ska vara en typ?
//user_id
//household_id
//avatar
