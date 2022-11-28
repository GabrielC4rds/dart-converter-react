import styled from 'styled-components'

export const Content = styled.div`
  width: 100%;
  padding: 30px;
  height: 50vh;
  background: #e0ffff;
  display: flex;
  flex-direction: column;
  h1{
    color: #000;
    font-size: 24px;
    font-weight: 400;
    letter-spacing: normal;
    margin: 0 0 16px;
  }
`;

export const CreateNewUserBtn = styled.div`
  cursor: pointer;
  border-radius: 5px;
  background: #673ab7;
  width: 175px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 13px;
  padding: 0 16px;
  font-weight: 700;
  align-self: flex-end; 
`;