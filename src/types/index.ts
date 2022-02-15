export interface IProject {
  docId?: string;
  name: string;
  projectId: string;
  userId: string;
}

export interface ITask {
  id?: string;
  archived: boolean;
  date: string;
  projectId: string;
  task: string;
  userId: string;
}
