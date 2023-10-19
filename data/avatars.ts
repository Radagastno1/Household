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

//FÖR ATT PRESENTERA EMOJIN:
//const avatarUrl = AvatarUrls[Avatars.Koala];   -> här kanske då profile.avatar?
//<Image source={{ uri: avatarUrl }} style={{ height: 50, width: 50 }} />
