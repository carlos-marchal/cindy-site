import styled from "styled-components";

export type ArrowDirection = "down" | "right";

export interface ArrowProps {
  direction: ArrowDirection;
  children: string;
  onClick: () => void;
}

const Button = styled.button`
  display: block;
`;

const SVG = styled.svg<{ direction: ArrowDirection }>`
  transform: ${({ direction }) =>
    ({ down: "rotate(0)", right: "rotate(90deg)" }[direction])};
  width: 36px;
  @media (min-width: 768px) {
    width: 70px;
  }
`;

export const Arrow = (props: ArrowProps) => (
  <Button onClick={props.onClick}>
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
  </Button>
);
