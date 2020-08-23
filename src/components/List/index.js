import React, { useState } from 'react';
import { Container, TaskList, Title } from './style';
import { Droppable } from 'react-beautiful-dnd';
import { PlusOutlined } from '@ant-design/icons';
import Card from '../Card';
import AddCard from '../AddCard';
import { useObserver } from 'mobx-react';
import { useRootStore } from '../../stores/context';


const List = ({ column, tasks }) => {
  const { appStore } = useRootStore();

  const [hideAddCard, setHideAddCard] = useState(false);
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const displayAddCard = () => {
    Promise.all([setHideAddCard(prevState =>
      !prevState,
    ), setShowAddCardForm(prevState =>
      !prevState)]).then(() => {
      console.log('add/hide card');
    }).catch(err => {
        console.log(err);
      },
    );
  };
  const hiddenAddCard = hideAddCard ? 'hidden' : '';
  const isShowCardForm = showAddCardForm ? '' : 'hidden';

  const handleCancelClick = () => {
    Promise.all([setHideAddCard(prevState =>
      !prevState,
    ), setShowAddCardForm(prevState =>
      !prevState)]).then(() => {
      console.log('add/hide card');
    }).catch(err => {
        console.log(err);
      },
    );
  };

  const addCardToList = (id, values) => {
    return appStore.addCardToList(id, values);
  };


  return useObserver(() => (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            {...provided.droppableProps}
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => <Card key={task.id} task={task} index={index}/>)}
            {provided.placeholder}
            <div className={`card-composer-container ${hiddenAddCard}`} onClick={displayAddCard}>
              <span className="add-card"><PlusOutlined style={{ paddingRight: '7px' }}/>Add a card</span>
            </div>
            <div className={`add-card-form-wrapper ${isShowCardForm}`}>
              <AddCard handleCancelClick={handleCancelClick} id={column.id} addCardToList={addCardToList}/>
            </div>
          </TaskList>
        )}
      </Droppable>
    </Container>


  ));
};


export default List;
