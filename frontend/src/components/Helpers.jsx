import React from 'react';
import styled from 'styled-components';
import { theme as globalTheme } from '../utils/style';

export const Title = ({ level = 1, children, className, center, stickedLeft }) => {
  const styles = {
    textTransform: 'uppercase',
    textAlign: center ? 'center' : 'left',
    color: globalTheme.dark,
    marginLeft: stickedLeft ? 0 : 'inherit',
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
    margin-left: ${({ direction = 'row', margin }) => direction === 'row' && margin};
    margin-right: ${({ direction = 'row', margin }) => direction === 'row' && margin};
    margin-top: ${({ direction = 'row', margin }) => direction === 'column' && margin};
    margin-bottom: ${({ direction = 'row', margin }) => direction === 'column' && margin};
  }
`;

export const ButtonLink = styled.a`
  color: ${({ theme, color }) => theme[color || 'primary']};
  cursor: pointer;
  padding-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;
