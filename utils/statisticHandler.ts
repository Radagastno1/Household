import { Task, TaskCompletion } from "../types";

let sortedTasks: Task[] = [];

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
