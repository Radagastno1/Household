import {
  Profile,
  ProfileData,
  StatData,
  Task,
  TaskCompletion,
  TaskData,
} from "../types";

let sortedTasks: Task[] = [];
let sortedProfiles: Profile[] = [];
let summarizedByTasks: TaskData[] = [];

export function sortTasksFromCompletions(
  completions: TaskCompletion[],
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

  console.log(sortedTasks);
  console.log(sortedTasks.length);
}

export function sortProfilesFromCompletions(
  completions: TaskCompletion[],
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

  console.log(sortedProfiles);
  console.log(sortedProfiles.length);
}

export function SummerizeEachTask(
  completions: TaskCompletion[],
  tasks: Task[],
  profiles: Profile[],
) {
  sortTasksFromCompletions(completions, tasks);
  sortProfilesFromCompletions(completions, profiles);

  sortedTasks.forEach((task) => {
    const typedTaskData: TaskData = {
      id: task.id,
      taskTitle: task.title,
      energyWeight: task.energiWeight,
      values: [],
    };
    completions
      .filter((completion) => completion.taskId === task.id)
      .forEach((completion) => {
        const profile = sortedProfiles.find(
          (profile) => completion.profileId === profile.id,
        );
        if (profile) {
          typedTaskData.values.forEach((value) => {
            if (value.id === profile?.id) {
              value.sum += task.energiWeight;
            } else {
              const typedProfileData: ProfileData = {
                id: profile?.id,
                avatar: profile?.avatar,
                color: "red",
                sum: task.energiWeight,
              };
              typedTaskData.values.push(typedProfileData);
            }
          });
        }
      });
    summarizedByTasks.push(typedTaskData);
  });

  console.log(summarizedByTasks);

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
