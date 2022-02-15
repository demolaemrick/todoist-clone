/* eslint-disable no-nested-ternary */
import { useState, useEffect } from 'react';
import moment from 'moment';
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers';
import { ITask } from '../types';

export const useTasks = (selectedProject: string) => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [archivedTasks, setArchivedTasks] = useState<ITask[]>([]);

  useEffect(() => {
    let unsubscribe = firebase
      .firestore()
      .collection('tasks')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw');

    unsubscribe =
      selectedProject && !collatedTasksExist(selectedProject)
        ? (unsubscribe = unsubscribe.where('projectId', '==', selectedProject))
        : selectedProject === 'TODAY'
        ? (unsubscribe = unsubscribe.where(
            'date',
            '==',
            moment().format('DD/MM/YYYY')
          ))
        : selectedProject === 'INBOX'
        ? // || selectedProject === 0
          (unsubscribe = unsubscribe.where('date', '==', ''))
        : unsubscribe;

    let updatedUnsubscribe = unsubscribe.onSnapshot((snapshot) => {
      const newTasks = snapshot.docs.map((task) => ({
        id: task.id,
        archived: task.data().archived,
        date: task.data().date,
        projectId: task.data().projectId,
        task: task.data().task,
        userId: task.data().userId,
      }));

      setTasks(
        selectedProject === 'NEXT_7'
          ? newTasks.filter(
              (task: ITask) =>
                moment(task.date, 'DD-MM-YYYY').diff(moment(), 'days') <= 7 &&
                task.archived !== true
            )
          : newTasks.filter((task: ITask) => task.archived !== true)
      );
      setArchivedTasks(
        newTasks.filter((task: ITask) => task.archived !== false)
      );
    });

    return () => updatedUnsubscribe();
  }, [selectedProject]);

  return { tasks, archivedTasks };
};

export const useProjects = () => {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    firebase
      .firestore()
      .collection('projects')
      .where('userId', '==', 'jlIFXIwyAL3tzHMtzRbw')
      .orderBy('projectId')
      .get()
      .then((snapshot) => {
        const allProjects = snapshot.docs.map((project) => ({
          ...project.data(),
          docId: project.id,
        }));

        if (JSON.stringify(allProjects) !== JSON.stringify(projects)) {
          setProjects(allProjects);
        }
      });
  }, [projects]);

  return { projects, setProjects };
};
