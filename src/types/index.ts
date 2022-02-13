export interface IProject {
  docId?: string;
  name: string;
  projectId: string;
  userId: string;
}
export interface IProjectsValue {
  docId: string;
  projects: IProject[];
}
