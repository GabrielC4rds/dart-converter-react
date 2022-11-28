import styled from "styled-components";

export const Content = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightcyan;
`;

export const LoginDiv = styled.div`
  border: 5px solid #ffd740;
  border-radius: 5px;
  padding: 20px;
  width: 370px;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h1{
    font-size: 20px;
    color: #000;
    font-weight: 600;
  }
`;

export const LoginBtn = styled.button`
  cursor: pointer;
  outline: none;
  min-width: 64px;
  line-height: 36px;
  padding: 0 16px;
  border: none;  
  border-radius: 5px;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
  background-color: #673ab7;
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
`;


export const RegistrationBtn = styled.button`
  cursor: pointer;
  outline: none;
  min-width: 64px;
  line-height: 36px;
  padding: 0 16px;
  border-radius: 5px;
  border: 1px solid #c5e0e0;  
  color: #ffd740;
  background-color: #e0ffff;
  display: flex;
  justify-content: center;
  align-items: center;
  div{
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
  }
`;

export const HidePasswordBtn = styled.button`
  border: none;
  width: 32px !important;
  background: transparent;
  position: absolute;
  right: 20px;
  cursor: pointer;
  top: 20px;
`;