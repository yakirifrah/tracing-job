import styled from 'styled-components';

export const Container = styled.div`
    border:1px solid lightgray;
    padding: 8px;
    margin-bottom: 8px;
    border-radius: 2px;
    background-color:${props => (props.isDragging ? 'lightgreen' : 'white')};
`;
