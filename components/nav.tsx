import Link from "next/link";
import styled from "styled-components";

const NavElement = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--black);
  color: var(--white);
  font: var(--header-font);
  display: grid;
  place-items: center;

  a:hover,
  button:hover {
    color: var(--highlight);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  box-sizing: content-box;
  margin: -20px;
  padding: 20px;
  --anchor: 50px;
  right: var(--anchor);
  top: var(--anchor);
  width: 14px;
  @media (min-width: 768px) {
    --anchor: 100px;
    width: 22px;
  }
`;

const UL = styled.ul`
  display: grid;
  gap: 35px;
  @media (min-width: 768px) {
    gap: 55px;
  }
`;

export interface NavProps {
  show?: boolean;
  onClose: () => void;
}

export const Nav = (props: NavProps) => {
  if (!props.show) {
    return null;
  }
  return (
    <NavElement>
      <CloseButton onClick={() => props.onClose()}>
        <CloseIcon />
      </CloseButton>
      <UL>
        <li>
          <Link href="#">
            <a>Works</a>
          </Link>
        </li>
        <li>
          <Link href="#">
            <a>About</a>
          </Link>
        </li>
      </UL>
    </NavElement>
  );
};

const CloseIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Close Navigation</title>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.5815 12.1673C13.7767 12.3625 13.7767 12.6791 13.5815 12.8744L12.8744 13.5815C12.6791 13.7767 12.3625 13.7767 12.1673 13.5815L6.93503 8.34924L1.7028 13.5815C1.50753 13.7767 1.19095 13.7767 0.995689 13.5815L0.288582 12.8744C0.0933203 12.6791 0.0933203 12.3625 0.288582 12.1673L5.52081 6.93503L0.146447 1.56066C-0.0488155 1.3654 -0.0488155 1.04882 0.146447 0.853553L0.853553 0.146447C1.04882 -0.0488156 1.3654 -0.0488154 1.56066 0.146447L6.93503 5.52081L12.3094 0.146447C12.5047 -0.0488154 12.8212 -0.0488156 13.0165 0.146447L13.7236 0.853553C13.9189 1.04882 13.9189 1.3654 13.7236 1.56066L8.34924 6.93503L13.5815 12.1673Z"
      fill="currentColor"
    />
  </svg>
);
