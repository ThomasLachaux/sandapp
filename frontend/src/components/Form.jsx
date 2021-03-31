import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  & > * {
    margin-top: 20px;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: white;
  border: 1px solid #e0e0e0;
  outline: none;
  height: 48px;
  padding: 5px 15px;
`;

export const ModalInput = styled(Input)`
  width: 400px;
`;
