export interface User {
  uid: string;
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface Profile {
  id: string;
  profileName: string;
  userId: string;
  householdId: string;
  avatar: string;
  isOwner: boolean;
  isActive: boolean;
}

export interface Household {
  id: string;
  name: string;
  code: string;
}

//fråga david
export interface Task {
  id: string;
  title: string;
  description: string;
  energyWeight: number;
  creatingDate: string; //default blir dagens datum
  interval: number; //dagar emellan?
  householdId: string;
  isActive: boolean;
}

export interface TaskCompletion {
  id: string;
  householdId: string;
  taskId: string;
  profileId: string;
  completionDate: string;
}

export interface TaskCompletionStat {
  id: string;
  householdId: string;
  taskId: string;
  profileId: string;
  completionDate: Date;
}

export interface AppState {
  isLoading: boolean;
}

export interface TaskData {
  id: string;
  taskTitle: string;
  energyWeight: number;
  values: ProfileData[];
}

export interface ProfileData {
  id: string;
  avatar: string;
  color: string;
  sum: number;
}

export interface StatData {
  title: string;
  series: number[];
  colors: string[];
}

export interface PieChart {
  color: string;
  serie: number;
}

// Show how to make a day function work between task-data and taskCompletion-data
// task created today 2023-10-12
// interval : 3 days

// task completed: 2023-10-15
// late by 1 day
// late by 2 day
// completed 2023-10-18
// completed 2023-10-21

// fråga david
// hushåll och user är many to many
// task och user är many to many

//user can have multiple households and avatars
//household can have multiple users

//user_to_household - table  fråga om denna ska vara en typ?
//user_id
//household_id
//avatar
