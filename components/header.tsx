import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { SiteSettingsNavigation } from "../sanity-client/config";
import { Nav } from "./nav";

const HeaderElement = styled.header`
  display: flex;
  justify-content: space-between;
  margin: 0 var(--lateral-margin);
  padding: 35px 0;
  border-bottom: 2px solid currentColor;

  a {
    text-decoration: none;
  }
`;

const HamburgerButton = styled.button`
  width: 16px;
  @media (min-width: 768px) {
    width: 25px;
  }
  :hover {
    color: var(--highlight);
  }
`;

export interface HeaderProps {
  navItems: SiteSettingsNavigation[];
  preview?: boolean;
  light?: boolean;
}

export const Header = (props: HeaderProps) => {
  const { pathname } = useRouter();
  const [showNav, setShowNav] = useState(false);
  const [navButtonRef, setNavButtonRef] = useState<HTMLButtonElement | null>(
    null
  );
  return (
    <HeaderElement>
      <div>
        <Link href="/" passHref legacyBehavior>
          <a>Cindy Adames</a>
        </Link>
      </div>
      {props.preview && (
        <Link href={`/api/exit-preview?${pathname.slice(1)}`} passHref legacyBehavior>
          <PreviewControl>Exit Preview Mode</PreviewControl>
        </Link>
      )}
      <HamburgerButton ref={setNavButtonRef} onClick={() => setShowNav(true)}>
        <HamburgerIcon />
      </HamburgerButton>
      <Nav
        show={showNav}
        onClose={() => setShowNav(false)}
        items={props.navItems}
        appearAnchor={navButtonRef}
        light={props.light}
      />
    </HeaderElement>
  );
};

const HamburgerIcon = () => (
  <svg viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Open Navigation</title>
    <rect width="25" height="3" rx="0.5" fill="currentColor" />
    <rect y="9.5" width="25" height="3" rx="0.5" fill="currentColor" />
    <rect y="19" width="25" height="3" rx="0.5" fill="currentColor" />
  </svg>
);

const PreviewControl = styled.a``;
