import React, { createContext, useContext, FC } from 'react';
import { useProjects } from '../hooks';

export const ProjectsContext = createContext<any>(null);

export const ProjectsProvider: FC = ({ children }) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);
