/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Button = styled.button`
  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : '')};
  font-size: 1.5em;
  background-color: ${({ theme, primary, disabled }) => (disabled ? '#e0e0e0' : primary ? theme.primary : theme.dark)};
  color: ${({ theme }) => theme.light};
  outline: none;
  cursor: ${({ disabled }) => (disabled ? 'inherit' : 'pointer')};
  border: none;
  padding: 12px 16px;
  transition: 0.15s;
  text-align: center;

  &:hover {
    color: ${({ theme, disabled }) => (disabled ? theme.light : theme.lightDarken)};
    background-color: ${({ theme, primary, disabled }) =>
      disabled ? 'e0e0e0' : primary ? theme.primaryDarken : theme.darkLighten};
  }
`;

export const IconButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
  font-size: 1.5em;
  height: 40px;
  width: 40px;
  border-radius: 20px;
  outline: none;

  &:hover {
    background-color: #eeeeee;
  }

  &:active {
    background-color: #d6d6d6;
  }

  & i {
    transition: transform 0.3s;

    &.rotate {
      transform: rotate(180deg);
    }
  }
`;
