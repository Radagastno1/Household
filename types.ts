export interface User {
  id: string;
  name: string;
  username: string;
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
  energiWeight: number;
  // creatingDate: Date; //default blir dagens datum
  creatingDate: string;
  interval: number; //dagar emellan?
  householdId: string;
}

export interface TaskCompletion {
  id: string;
  taskId: string;
  profileId: string;
  completionDate: Date;
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
