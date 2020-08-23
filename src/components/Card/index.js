import React, { useEffect, useRef, useState } from 'react';
import { CardContainer, CardEditor, Container } from './style';
import { Draggable } from 'react-beautiful-dnd';
import { CloseOutlined, EditOutlined } from '@ant-design/icons';

const Card = ({ task, index, editCard }) => {
  const ref = useRef();
  const [showEdit, setShownEdit] = useState(false);
  const [textAreaVal, setTextAreaValue] = useState('');
  const handleChange = (event) => setTextAreaValue(event.target.value);
  const handleEditCard = (event) => {
    if (ref.current.value !== textAreaVal !== '') {
      const newVal = textAreaVal;
      editCard({ task, newVal });
      setShownEdit(false);

    }
  };
  const handleFocus = (event) => event.target.select();
  useEffect(() => {
    if (showEdit) {
      ref.current.select();
    }
  }, [showEdit]);
  return (
    <CardContainer>
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
            <span className='edit-content' style={{ display: 'none' }} onClick={() => {
              setShownEdit(true);
              setTextAreaValue(task.content);
            }}> <EditOutlined
              style={{ fontsize: '12px' }}/></span>
          </Container>
        )}
      </Draggable>
      <CardEditor
        showEdit={showEdit}
      >

        <div className='card-editor' onClick={(event) => {
          if (event.target !== event.currentTarget)
            return;
          setShownEdit(false);
        }}>
           <span className='card-editor-close-icon' onClick={(event) => setShownEdit(false)}><CloseOutlined
             style={{ fontSize: '24px' }}/></span>
          <div className='form-editor'>
            {showEdit && (
              <textarea className='card-editor-text-area' value={textAreaVal} onChange={handleChange} ref={ref}
                        spellCheck={false}/>

            )}
            <div className='btn-wrapper'>
              <button className='btn btn-save' onClick={handleEditCard}>Save</button>
              <button className='btn btn-delete'>Delete</button>
            </div>
          </div>

        </div>
      </CardEditor>
    </CardContainer>
  );
};

export default Card;
