import { useState, useEffect } from 'react';
import Tabs from './Tabs';
import TaskItem from './TaskItem';
import { getData } from '../api';

export default function TaskList({addedTask}) {
  const [tasksList, setTasksList] = useState([]);

  useEffect(() => {
    console.log('Компонент монтируется');
    const loadUsers = async () => {
      const data = await getData();

      if (!data) {
        return <p>данных нет</p>;
      }

      setTasksList(data);
    };

    loadUsers();
  }, [addedTask]);

  return (
    <>
      <Tabs />
      <ul>
        {tasksList.map((task) => (
          <TaskItem task={task} />
        ))}
      </ul>
    </>
  );
}
