// Task Types matching frontend exactly
export interface TaskInput {
  title: string;
  isCompleted?: boolean;
  priority?: "p1" | "p2" | "p3";
}

export interface TaskUpdate {
  title?: string;
  isCompleted?: boolean;
  priority?: "p1" | "p2" | "p3";
}
