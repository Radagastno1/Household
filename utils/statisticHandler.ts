import { useAppSelector } from "../store/store";
import { Task } from "../types";

const tasks = useAppSelector((state) => state.task);
const taskCompletion = useAppSelector((state) => state.taskCompletion);
tasks.tasks;
let sortedTasks: Task[] = [];

export function sortTasksFromCompletions() {
  taskCompletion.completions.forEach((completion) => {
    tasks.tasks.forEach((task) => {
      if (completion.taskId === task.id) {
        if (!sortedTasks.includes(task)) {
          sortedTasks.push(task);
        }
      }
    });
  });

  console.log(sortedTasks);
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
