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
  [Avatars.Koala]: "gray",
  [Avatars.Beetle]: "red",
  [Avatars.Fox]: "orange",
  [Avatars.Pig]: "pink",
};

export const AvatarUrls: Record<Avatars, string> = {
  [Avatars.Bee]: "https://i.imgur.com/Nmpxs1X.png",
  [Avatars.Frog]: "https://i.imgur.com/Dhlgxlg.png",
  [Avatars.Monkey]: "https://i.imgur.com/Ixi8I7M.png",
  [Avatars.Cat]: "https://i.imgur.com/5syYB4H.png",
  [Avatars.Koala]: "https://i.imgur.com/1lFwUAT.png",
  [Avatars.Beetle]: "https://i.imgur.com/fYRrn8f.png",
  [Avatars.Fox]: "https://i.imgur.com/xlu0km7.png",
  [Avatars.Pig]: "https://i.imgur.com/nucgvBe.png",
};

export function getAvatarColorString(avatarString: string) {
  switch (avatarString) {
    case Avatars.Bee:
      return "yellow";
    case Avatars.Frog:
      return "green";
    case Avatars.Monkey:
      return "brown";
    case Avatars.Cat:
      return "purple";
    case Avatars.Koala:
      return "gray";
    case Avatars.Beetle:
      return "red";
    case Avatars.Fox:
      return "orange";
    case Avatars.Pig:
      return "pink";
    default:
      return "white";
  }
}

