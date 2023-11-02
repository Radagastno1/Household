import { getAvatarColorString } from "../data/avatars";
import {
  Profile,
  ProfileData,
  StatData,
  Task,
  TaskCompletion,
  TaskCompletionStat,
  TaskData,
  PieChart,
} from "../types";

let sortedTasks: Task[] = [];
let sortedProfiles: Profile[] = [];
let summarizedByTasks: TaskData[] = [];
let totalSumByProfile: Profile[] = [];

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

  return sortedCompletions;
}

export function sortTasksFromCompletions(
  completions: TaskCompletionStat[],
  tasks: Task[],
) {
  sortedTasks = [];

  const taskWithCompletions = new Set(
    completions.map((completion) => completion.taskId),
  );
  sortedTasks = tasks.filter((task) => taskWithCompletions.has(task.id));
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
}

export function SummerizeEachTask(
  completions: TaskCompletion[],
  tasks: Task[],
  profiles: Profile[],
  startDate: string,
  endDate: string,
) {
  summarizedByTasks = [];

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
  return statDataArray;
}

export function summarizeDataByColor(data: StatData[]) {
  const colors: string[] = [];
  const series: number[] = [];

  data.forEach((item) => {
    const itemColors = item.colors;
    const itemSeries = item.series;

    itemColors.forEach((color, index) => {
      const existingIndex = colors.indexOf(color);

      if (existingIndex !== -1) {
        // Om färgen redan finns i colors-arrayen, uppdatera den befintliga serievärdet
        series[existingIndex] += itemSeries[index];
      } else {
        // Annars lägg till färgen i colors-arrayen och det motsvarande serievärdet i series-arrayen
        colors.push(color);
        series.push(itemSeries[index]);
      }
    });
  });

  return { colors, series };
}
