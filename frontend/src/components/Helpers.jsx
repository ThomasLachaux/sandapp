import React from 'react';
import styled from 'styled-components';
import { theme } from '../utils/style';
import PropTypes from 'prop-types';

export const Title = ({ level = 1, children, className }) => {
	const styles = {
		textTransform: 'uppercase',
		color: theme.primary,
	};

	const Tag = `h${level}`;

	return (
		<Tag style={styles} className={className}>
			{children}
		</Tag>
	);
};

export const Subtitle = styled.span`
	color: ${({ theme }) => theme.primaryLighten};
`;

export const IconButton = styled.button`
	cursor: pointer;
	border: none;
	background-color: transparent;
	transition: 0.5ms;
	border: 3px solid black;
	height: 40px;
	width: 40px;
	border-radius: 20px;
	outline: none;

	&:hover {
		transform: scale(1.1);
	}
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
