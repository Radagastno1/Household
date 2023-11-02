export interface User {
  uid: string;
  email: string | null;
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

export interface Task {
  id: string;
  title: string;
  description: string;
  energyWeight: number;
  creatingDate: string;
  interval: number;
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

export interface HouseholdRequest {
  id: string;
  profileId: string;
  userMail: string;
  householdId: string;
  status: "pending" | "approved" | "rejected";
}
