import Link from "next/link";
import React from "react";
import styled from "styled-components";

export type ArrowDirection = "up" | "down" | "right";

export interface ArrowButtonProps {
  direction: ArrowDirection;
  children: string;
  onClick: () => void;
}

export interface ArrowLinkProps {
  direction: ArrowDirection;
  children: string;
  href: string;
}

export type ArrowProps = ArrowButtonProps | ArrowLinkProps;

const Button = styled.button`
  display: block;
`;

const StyledLink = styled(Link)`
  display: block;
`;

const SVG = styled.svg<{ direction: ArrowDirection }>`
  transform: rotate(
    ${({ direction }) => ({ down: 0, right: 90, up: 180 }[direction])}deg
  );
  width: 36px;
  @media (min-width: 768px) {
    width: 70px;
  }
`;

function wrapArrow(props: ArrowProps, content: React.ReactNode) {
  if ("onClick" in props) {
    return <Button onClick={props.onClick}>{content}</Button>;
  }
  return <StyledLink href={props.href}>{content}</StyledLink>;
}

export const Arrow = (props: ArrowProps) =>
  wrapArrow(
    props,
    <SVG
      direction={props.direction}
      viewBox="0 0 69 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{props.children}</title>
      <path
        d="M34.5 0V63M34.5 63L1 29.293M34.5 63L68 29.293"
        stroke="currentColor"
        strokeWidth="2"
      />
    </SVG>
  );
