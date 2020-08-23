import React from 'react';
import { Container } from './style';
import { Draggable } from 'react-beautiful-dnd';

const Card = ({ task, index }) => {
  return (
    <Draggable
      draggableId={task.id}
      index={index}>
      {(provided, snapshot) => (
        <Container
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
          ref={provided.innerRef}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  );
};

export default Card;
