import styled, { css } from 'styled-components';

export const Container = styled.div`
  


`;

export const Button = styled.button`
 background-color: transparent;
  border-radius: 0.5rem;
  border: 0.5px solid rgba(116, 185, 255,1.0);
  color: rgba(116, 185, 255,1.0);
  margin: 0.5em 1em;
  font-weight: bolder;
  padding: 0.25em 1em;
  
  &:hover {
    cursor: pointer;
  }
   ${props => props.login && css`
    &:hover {
     color: rgba(9, 132, 227,1.0);
    }
  `}

  ${props => props.signup && css`
    background: #3C95D2;
    color: white;
    &:hover {
      background-color: rgba(9, 132, 227,1.0);
    }
  `}
`;
