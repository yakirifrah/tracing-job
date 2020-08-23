import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import { useObserver } from 'mobx-react';
import { useRootStore } from '../../stores/context';
import List from '../../components/List';
import { DragDropContext } from 'react-beautiful-dnd';
import { Container } from './style';
import NavBar from '../../components/NavBar';
import Loader from '../../components/Common/Loader';
import { loggerMobx } from '../../helpers';

const Main = () => {
  const { appStore } = useRootStore();
  useEffect(() => {
    appStore.getDataByUid();
  }, []);
  const onDragStart = () => {

  };

  const onDragUpdate = () => {

  };
  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    console.log('destination: ', destination);
    console.log('source: ', source);
    console.log('draggableId: ', draggableId);
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }
    const start = appStore.initialData.columns[source.droppableId];
    const finish = appStore.initialData.columns[destination.droppableId];
    loggerMobx({ start });
    loggerMobx({ finish });
    if (start === finish) {
      const newTaskIds = Array.from(start.tasksId);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        tasksId: newTaskIds,
      };
      const newState = {
        ...appStore.initialData,
        columns: {
          ...appStore.initialData.columns,
          [newColumn.id]: newColumn,
        },
      };
      return appStore.updateColumnsTask(newState);
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.tasksId);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      tasksId: startTaskIds,
    };
    const finishTaskIds = Array.from(finish.tasksId);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      tasksId: finishTaskIds,
    };
    const newState = {
      ...appStore.initialData,
      columns: {
        ...appStore.initialData.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    return appStore.updateColumnsTask(newState);
  };

  return useObserver((() =>
      <>
        <NavBar/>
        {appStore.state === 'pending' ? (
          <Loader/>
        ) : (
          <Container>
            <DragDropContext
              onDragEnd={onDragEnd}
              onDragUpdate={onDragUpdate}
              onDragStart={onDragStart}
            >
              {
                appStore.initialData.columnOrder.map(columnId => {
                  const column = appStore.initialData.columns[columnId];
                  const tasks = column.tasksId.map(taskId => appStore.initialData.tasks[taskId]);
                  return <List key={column.id} column={column} tasks={tasks}/>;
                })
              }
            </DragDropContext>
          </Container>
        )}
      </>
  ));
};
export default withRouter(Main);
