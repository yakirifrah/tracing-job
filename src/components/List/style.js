import styled from 'styled-components';

export const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgray;
    background-color:#EBECF0;
    border-radius: 2px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    height: fit-content;
  .card-composer-container {
        display: flex;
        &:hover{
         background-color: rgba(9,30,66,.13);
         cursor: pointer;
        }
        &.hidden{
          display: none;
        }
    }
    .add-card-form-wrapper {
      background-color: white;
      padding: 7px;
        &.hidden{
          display: none;
        }
    }
`;
export const Title = styled.h3`
  padding: 8px;

`;
export const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#EBECF0')};
  flex-grow: 1;
  min-height: 100px;
`;


