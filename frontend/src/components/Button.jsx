import styled from 'styled-components';

export const Button = styled.button`
	text-transform: uppercase;
	font-size: 1.5em;
	background-color: transparent;
	border-radius: 10px;
	outline: none;
	border: ${({ theme }) => `3px solid ${theme.primary}`};
	cursor: pointer;
	padding: 5px 15px;
	transition: 0.15s;

	&:hover {
		color: ${({ theme }) => theme.light};
		background-color: ${({ theme }) => theme.primary};
	}
`;
