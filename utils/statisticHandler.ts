import { getAvatarColorString } from "../data/avatars";
import {
  Profile,
  ProfileData,
  StatData,
  Task,
  TaskCompletion,
  TaskCompletionStat,
  TaskData,
} from "../types";

let sortedTasks: Task[] = [];
let sortedProfiles: Profile[] = [];
let summarizedByTasks: TaskData[] = [];

export function sortTaskCompletionsByDate(
  startDate: string,
  endDate: string,
  completions: TaskCompletion[],
) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const factorCompletions: TaskCompletionStat[] = completions.map(
    (completion) => {
      return {
        id: completion.id,
        householdId: completion.householdId,
        taskId: completion.taskId,
        profileId: completion.profileId,
        completionDate: new Date(completion.completionDate),
      };
    },
  );

  const sortedCompletions = factorCompletions.filter((completion) => {
    const completionDate = completion.completionDate;
    return completionDate >= start && completionDate <= end;
  });

  console.log("Sorted completions: ", sortedCompletions);
  console.log("Sorted completions: ", sortedCompletions.length);
  return sortedCompletions;
}

export function sortTasksFromCompletions(
  completions: TaskCompletionStat[],
  tasks: Task[],
) {
  completions.forEach((completion) => {
    tasks.forEach((task) => {
      if (completion.taskId === task.id) {
        if (!sortedTasks.includes(task)) {
          sortedTasks.push(task);
        }
      }
    });
  });

  console.log("SortedtTasks: ", sortedTasks);
  console.log(sortedTasks.length);
}

export function sortProfilesFromCompletions(
  completions: TaskCompletionStat[],
  profiles: Profile[],
) {
  completions.forEach((completion) => {
    profiles.forEach((profile) => {
      if (completion.profileId === profile.id) {
        if (!sortedProfiles.includes(profile)) {
          sortedProfiles.push(profile);
        }
      }
    });
  });

  console.log("Sorted profiles: ", sortedProfiles);
  console.log(sortedProfiles.length);
}

export function SummerizeEachTask(
  completions: TaskCompletion[],
  tasks: Task[],
  profiles: Profile[],
  startDate: string,
  endDate: string,
) {
  const sortedCompletions = sortTaskCompletionsByDate(
    startDate,
    endDate,
    completions,
  );
  sortTasksFromCompletions(sortedCompletions, tasks);
  sortProfilesFromCompletions(sortedCompletions, profiles);

  sortedTasks.forEach((task) => {
    const typedTaskData: TaskData = {
      id: task.id,
      taskTitle: task.title,
      energyWeight: task.energyWeight,
      values: [],
    };

    sortedCompletions
      .filter((completion) => completion.taskId === task.id)
      .forEach((completion) => {
        const profile = sortedProfiles.find(
          (profile) => completion.profileId === profile.id,
        );

        if (profile) {
          let existingProfileData = typedTaskData.values.find(
            (value) => value.id === profile.id,
          );

          if (existingProfileData) {
            // Profile already exists in values, update sum
            existingProfileData.sum += task.energyWeight;
          } else {
            // Profile doesn't exist, create a new ProfileData
            const avatarColor = getAvatarColorString(profile.avatar);
            const typedProfileData: ProfileData = {
              id: profile.id,
              avatar: profile.avatar,
              color: avatarColor, // You can set the color as needed
              sum: task.energyWeight,
            };
            typedTaskData.values.push(typedProfileData);
          }
        }
      });

    summarizedByTasks.push(typedTaskData);
  });

  console.log("summarizedbytasks: ", summarizedByTasks);
  console.log(summarizedByTasks.length);

  return mapToPieChart(summarizedByTasks);
}

function mapToPieChart(summarizedByTasks: TaskData[]) {
  const statDataArray: StatData[] = [];

  summarizedByTasks.forEach((sum) => {
    const series = sum.values.map((value) => value.sum);
    const colors = sum.values.map((value) => value.color);
    const stat: StatData = {
      title: sum.taskTitle,
      series: series,
      colors: colors,
    };
    statDataArray.push(stat);
  });

  console.log("MaptoPieChart: ", statDataArray);
  return statDataArray;
}

export function getUniqueSummarizedData(summarizedData: StatData[]) {
  const uniqueData: StatData[] = [];
  const titles = new Set(); // Använd en uppsättning för att hålla reda på unika titlar

  summarizedData.forEach((data) => {
    if (!titles.has(data.title)) {
      titles.add(data.title);
      uniqueData.push(data);
    }
  });

  return uniqueData;
}
// -- hämtar ut alla tasksCompletions

// -- sorterar ut task efter taskCompletions.taskId

// -- sorterar ut alla profiler från listan med taskCompletions som sorterats efter task.id
// ---- hämtar ut avatarinfon: avatar och profil.id och ev färg
// -- går igenom listan med sorterade taskCompletions igen och för varje profil som hittas adderas taskens value till profilens amount

// Gör detta på alla tasken. Medan detta görs läggs all till i en summeringslista

// ProfileToTask
// task.title: string,
// task.energyWeight: number,
// values: StatData[]

// StatData
// profile.avatar
// profile.color
// sum:
