import styled from 'styled-components';

export const Button = styled.button`
  cursor: pointer;
  border-radius: 3px;
  padding: 0.7rem 2.5rem;
  margin-right: 10px;
  border: none;
  -webkit-appearance: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  color: #fff;
  background: #582be8;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: gray;
  }

  &:hover {
    opacity: 0.8;
  }

  ${({ secondary }) =>
    secondary &&
    `
		background: #001F3F;
	`}
`;
