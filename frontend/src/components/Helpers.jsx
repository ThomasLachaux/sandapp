import React from 'react';
import styled from 'styled-components';
import { theme as globalTheme } from '../utils/style';

export const Title = ({ level = 1, children, className, center }) => {
  const styles = {
    textTransform: 'uppercase',
    textAlign: center ? 'center' : 'left',
    color: globalTheme.dark,
  };

  const Tag = `h${level}`;

  return (
    <Tag style={styles} className={className}>
      {children}
    </Tag>
  );
};

export const Text = styled.span`
  color: ${({ theme, color }) => (color ? theme[color] : theme.black)};
  text-align: ${({ center }) => (center ? 'center' : 'left')};
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction = 'row' }) => direction};
  justify-content: ${({ justifyContent = 'space-between' }) => justifyContent};
  align-items: ${({ alignItems = 'start' }) => alignItems};
  flex-wrap: wrap;

  & > * {
    margin-left: ${({ direction = 'row', margin = 'inherit' }) => (direction === 'row' ? margin : 'inherit')};
    margin-right: ${({ direction = 'row', margin = 'inherit' }) => (direction === 'row' ? margin : 'inherit')};
    margin-top: ${({ direction = 'row', margin = 'inherit' }) => (direction === 'column' ? margin : 'inherit')};
    margin-bottom: ${({ direction = 'row', margin = 'inherit' }) => (direction === 'column' ? margin : 'inherit')};
  }
`;
