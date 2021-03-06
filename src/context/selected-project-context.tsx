import React, { createContext, useContext, useState, FC } from 'react';
import PropTypes from 'prop-types';

interface ISelectProjectContext {
  selectedProject: string;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectedProjectContext = createContext<ISelectProjectContext>(
  {} as ISelectProjectContext
);
export const SelectedProjectProvider: FC = ({ children }) => {
  const [selectedProject, setSelectedProject] = useState<string>('INBOX');

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);

SelectedProjectProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
