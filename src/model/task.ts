export interface Task {
  id?: number; // Optional if auto-incremented by IndexedDB
  projectId: number;
  taskName: string;
  dueDate: string;
  pomodoros: number;
  description: string;
  completed: boolean;
  subtasks: Subtask[];
}

export interface Subtask {
  name: string;
  description: string;
  completed: boolean;
}
