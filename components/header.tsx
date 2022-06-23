import styled from "styled-components";

const HeaderElement = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0 var(--lateral-margin);
  padding: 35px 0 45px 0;
  border-bottom: 2px solid var(--black);
`;

const HamburgerButton = styled.button`
  width: 16px;
  @media (min-width: 768px) {
    width: 25px;
  }
`;

export const Header = () => (
  <HeaderElement>
    <div>Cindy Adames</div>
    <HamburgerButton>
      <HamburgerIcon />
    </HamburgerButton>
  </HeaderElement>
);

const HamburgerIcon = () => (
  <svg viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="25" height="3" rx="0.5" fill="currentColor" />
    <rect y="9.5" width="25" height="3" rx="0.5" fill="currentColor" />
    <rect y="19" width="25" height="3" rx="0.5" fill="currentColor" />
  </svg>
);
