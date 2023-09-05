import styled, { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";

// Define the ButtonProps interface
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
}

// Define the styled button component
const Button = styled.button<ButtonProps>`
  font-family: var(--roboto-font-family);
  background: var(--netural50-color);
  border-radius: 5px;
  border: 2px solid #fff;
  color: var(--white-color);
  margin: 5pt;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border: none;

  ${(props) =>
    props.primary &&
    css`
      background: var(--primary-color);
      color: white;
    `};
`;

export default Button;
