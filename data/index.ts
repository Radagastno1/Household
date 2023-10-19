import { Household, Profile, Task, TaskCompletion, User } from "../types";

export const users: User[] = [
  {
    id: "user1",
    name: "User One",
    username: "userone",
    password: "password1",
  },
  {
    id: "user2",
    name: "User Two",
    username: "usertwo",
    password: "password2",
  },
  {
    id: "user3",
    name: "User Three",
    username: "userthree",
    password: "password3",
  },
  {
    id: "user4",
    name: "User Four",
    username: "userfour",
    password: "password4",
  },
  {
    id: "user5",
    name: "User Five",
    username: "userfive",
    password: "password5",
  },
];

export const households: Household[] = [
  {
    id: "fYHVLNiQvWEG9KNUGqBT",
    name: "Household One",
    code: "code1",
  },
  {
    id: "household2",
    name: "Household Two",
    code: "code2",
  },
];

// Added avatarcolor to profile so long
export const profiles: Profile[] = [
  {
    id: "profile1",
    profileName: "Silly User 1",
    userId: "user1",
    householdId: "fYHVLNiQvWEG9KNUGqBT",
    avatar: "bee",
    isOwner: true,
    isActive: true,
  },
  {
    id: "profile2",
    profileName: "Funny User 2",
    userId: "user2",
    householdId: "fYHVLNiQvWEG9KNUGqBT",
    avatar: "frog",
    isOwner: false,
    isActive: true,
  },
  {
    id: "profile3",
    profileName: "Horny User 3",
    userId: "user3",
    householdId: "fYHVLNiQvWEG9KNUGqBT",
    avatar: "cat",
    isOwner: false,
    isActive: true,
  },
  {
    id: "profile4",
    profileName: "Clever User 4",
    userId: "user4",
    householdId: "fYHVLNiQvWEG9KNUGqBT",
    avatar: "pig",
    isOwner: false,
    isActive: false,
  },
  {
    id: "profile5",
    profileName: "Lazy User 5",
    userId: "user5",
    householdId: "fYHVLNiQvWEG9KNUGqBT",
    avatar: "fox",
    isOwner: false,
    isActive: true,
  },
  {
    id: "profile6",
    profileName: "Hungry User 6",
    userId: "user2",
    householdId: "household2",
    avatar: "bee",
    isOwner: true,
    isActive: true,
  },
  {
    id: "profile7",
    profileName: "Fast User 7",
    userId: "user3",
    householdId: "household2",
    avatar: "pig",
    isOwner: false,
    isActive: true,
  },
  {
    id: "profile8",
    profileName: "Jumpy User 8",
    userId: "user4",
    householdId: "household2",
    avatar: "frog",
    isOwner: false,
    isActive: true,
  },
  {
    id: "profile9",
    profileName: "Slow User 9",
    userId: "user5",
    householdId: "household2",
    avatar: "frog",
    isOwner: false,
    isActive: false,
  },
  {
    id: "profile10",
    profileName: "Dreamy User 10",
    userId: "user1",
    householdId: "household2",
    avatar: "ladybug",
    isOwner: false,
    isActive: true,
  },
];

export const tasks: Task[] = [
  {
    id: "task1",
    title: "Damma vardagsrummet",
    description: "Damma vardagsrummets ytor",
    energiWeight: 4,
    creatingDate: new Date("2023-10-01").toISOString(), //default blir dagens datum
    interval: 5, //dagar emellan?
    householdId: "fYHVLNiQvWEG9KNUGqBT",
  },
  {
    id: "task2",
    title: "Laga middag",
    description: "Laga dagens middag",
    energiWeight: 6,
    creatingDate: new Date("2023-10-03").toISOString(),
    interval: 1,
    householdId: "fYHVLNiQvWEG9KNUGqBT",
  },
  {
    id: "task3",
    title: "Vattna blommorna",
    description:
      "Vattna alla blommor i hushållet. Tänk på att vattna orkideerna underifrån!",
    energiWeight: 2,
    creatingDate: new Date("2023-10-04").toISOString(),
    interval: 4,
    householdId: "fYHVLNiQvWEG9KNUGqBT",
  },
  {
    id: "task4",
    title: "Mata katten",
    description: "Både torr och blötmat!",
    energiWeight: 2,
    creatingDate: new Date("2023-10-02").toISOString(), //default blir dagens datum
    interval: 1, //dagar emellan?
    householdId: "fYHVLNiQvWEG9KNUGqBT",
  },
  {
    id: "task5",
    title: "Dammsuga",
    description: "Alla ytor, glöm inte under mattorna med!",
    energiWeight: 6,
    creatingDate: new Date("2023-10-06").toISOString(), //default blir dagens datum
    interval: 6, //dagar emellan?
    householdId: "fYHVLNiQvWEG9KNUGqBT",
  },
  {
    id: "task6",
    title: "Dammsuga",
    description: "Alla ytor, glöm inte under mattorna med!",
    energiWeight: 4,
    creatingDate: new Date("2023-10-01").toISOString(), //default blir dagens datum
    interval: 3, //dagar emellan?
    householdId: "household2",
  },
  {
    id: "task7",
    title: "Gå ut med hunden",
    description: "Glöm inte bajspåsen!",
    energiWeight: 4,
    creatingDate: new Date("2023-10-04").toISOString(), //default blir dagens datum
    interval: 1, //dagar emellan?
    householdId: "household2",
  },
  {
    id: "task8",
    title: "Tvätta",
    description: "Läs noga på tvättråden!",
    energiWeight: 2,
    creatingDate: new Date("2023-10-04").toISOString(), //default blir dagens datum
    interval: 5, //dagar emellan?
    householdId: "household2",
  },
  {
    id: "task9",
    title: "Moppa golvet",
    description: "Moppa alla golvytor",
    energiWeight: 6,
    creatingDate: new Date("2023-10-02").toISOString(), //default blir dagens datum
    interval: 14, //dagar emellan?
    householdId: "household2",
  },
  {
    id: "task10",
    title: "Handla",
    description: "Betala med mastercardet",
    energiWeight: 8,
    creatingDate: new Date("2023-10-04").toISOString(), //default blir dagens datum
    interval: 7, //dagar emellan?
    householdId: "household2",
  },
];

export const taskCompletions: TaskCompletion[] = [
  {
    id: "completion1",
    taskId: "task1",
    profileId: "profile2",
    completionDate: new Date("2023-10-01").toISOString(),
  },
  {
    id: "completion2",
    taskId: "task1",
    profileId: "profile5",
    completionDate: new Date("2023-10-06").toISOString(),
  },
  {
    id: "completion3",
    taskId: "task2",
    profileId: "profile5",
    completionDate: new Date("2023-10-03").toISOString(),
  },
  {
    id: "completion4",
    taskId: "task2",
    profileId: "profile3",
    completionDate: new Date("2023-10-04").toISOString(),
  },
  {
    id: "completion5",
    taskId: "task2",
    profileId: "profile1",
    completionDate: new Date("2023-10-05").toISOString(),
  },
  {
    id: "completion6",
    taskId: "task10",
    profileId: "profile7",
    completionDate: new Date("2023-10-04").toISOString(),
  },
  {
    id: "completion7",
    taskId: "task10",
    profileId: "profile10",
    completionDate: new Date("2023-10-11").toISOString(),
  },
  {
    id: "completion8",
    taskId: "task10",
    profileId: "profile9",
    completionDate: new Date("2023-10-16").toISOString(),
  },
  {
    id: "completion9",
    taskId: "task8",
    profileId: "profile6",
    completionDate: new Date("2023-10-04").toISOString(),
  },
  {
    id: "completion10",
    taskId: "task8",
    profileId: "profile9",
    completionDate: new Date("2023-10-09").toISOString(),
  },
  {
    id: "completion11",
    taskId: "task6",
    profileId: "profile2",
    completionDate: new Date("2023-10-15").toISOString(),
  },
  {
    id: "completion12",
    taskId: "task1",
    profileId: "profile3",
    completionDate: new Date().toISOString(),
  },
  {
    id: "completion13",
    taskId: "task5",
    profileId: "profile5",
    completionDate: new Date().toISOString(),
  },
  {
    id: "completion14",
    taskId: "task4",
    profileId: "profile4",
    completionDate: new Date().toISOString(),
  },
];
