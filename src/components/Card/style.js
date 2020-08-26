import styled from 'styled-components';

export const CardContainer = styled.div`
    position: relative;
    height: fit-content;
`;


export const Container = styled.div`
    border:1px solid lightgray;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.08);
    padding: 8px;
    margin-bottom: 8px;
    position: relative;
    height: fit-content;
    border-radius: 2px;
    background-color: white;
    
   &:hover {
    background-color:rgba(236, 240, 241,1.0);
    .edit-content {
    display: inline !important;
    }
     }
     .edit-content {
      position: absolute;
      right: 7px;
      top:3px;
        &:hover {
        background-color:lightgray;
        }
     }
`;


export const CardEditor = styled.div`
    display: ${props => props.showEdit ? 'block' : 'none'};
    background: rgba(0,0,0,.6);
    bottom: 0;
    color: #fff;
    left: 0;
    position: fixed;
    right: 0;
    top: 0;
    z-index: 10;
    .card-editor-close-icon {
    color: hsla(0,0%,100%,.6);
    padding: 13px;
    position: fixed;
    right: 0;
    top: 0;
    transition-property: transform,color;
    transition-duration: .15s;
    line-height: 32px;

      &:hover {
        color: #fff;
        cursor: pointer;
        transform: scale(1.2);
      }

    }
    .card-editor{
       height: 100vh;
      position: relative;
      .form-editor{ 
        width: 25vw;
        position: fixed;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        .card-editor-text-area {
        width: inherit;
        resize: none;
        background-color: #fafbfc;
        border: none;
        box-shadow: inset 0 0 0 2px #dfe1e6;
        color: #172b4d !important;
        box-sizing: border-box;
        -webkit-appearance: none;
        border-radius: 3px;
        display: block;
        line-height: 20px;
        margin-bottom: 12px;
        padding: 8px 12px;
        transition-property: background-color,border-color,box-shadow;
        transition-duration: 85ms;
        transition-timing-function: ease;
        }
        .btn-wrapper{
         .btn {
            padding:6px 24px;
            color:white;
            cursor: pointer;
            border: none;
            border-radius: 16px;
         
         &.btn-save {
          margin-right:13px;
          background-color: #61BD4F;
            &:hover{
            background-color: #32ff7e;
            }
          }
           &.btn-delete {
          background-color: #ff3838;
            &:hover{
            background-color: #ff4d4d;
            }
           }
         }
         
        }
      }
    }
`;
