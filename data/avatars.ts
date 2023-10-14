export enum Avatars {
  Bee = "Bee",
  Frog = "Frog",
  Monkey = "Monkey",
  Cat = "Cat",
  Koala = "Koala",
  Beetle = "Beetle",
  Fox = "Fox",
  Pig = "Pig",
}

export const AvatarColors: Record<Avatars, string> = {
  [Avatars.Bee]: "yellow",
  [Avatars.Frog]: "green",
  [Avatars.Monkey]: "brown",
  [Avatars.Cat]: "purple",
  [Avatars.Koala]: "grey",
  [Avatars.Beetle]: "red",
  [Avatars.Fox]: "orange",
  [Avatars.Pig]: "pink",
};

const avatarWithUrl = [{ avatar: "monkey", url: "" }];
