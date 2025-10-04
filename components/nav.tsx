import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { RefObject, useEffect, useRef } from "react";
import styled from "styled-components";
import { SiteSettingsNavigation } from "../sanity-client/config";

const NavElement = styled(motion.nav)<{ light?: boolean }>`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ light }) => (light ? "var(--white)" : "var(--black)")};
  color: ${({ light }) => (light ? "var(--black)" : "var(--white)")};
  font: var(--header-font);
  display: grid;
  place-items: center;
  text-align: center;

  a {
    text-decoration: none;
  }

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
  margin-right: -15px;
  right: var(--lateral-margin);
  top: 40px;
  width: 16px;
  @media (min-width: 768px) {
    width: 25px;
    margin-right: -20px;
    margin-top: -24px;
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
  items: SiteSettingsNavigation[];
  appearAnchor: HTMLElement | null;
  light?: boolean;
}

interface ClipCircleStyles {
  closed: string;
  open: string;
}

export const Nav = (props: NavProps) => {
  const clipCircle = useRef<ClipCircleStyles>({ closed: "none", open: "none" });
  useEffect(() => {
    if (props.appearAnchor !== null) {
      const maxScreenSize = Math.max(window.innerWidth, window.innerHeight);
      const minSafeClipRadius = maxScreenSize * Math.sqrt(2);
      const buttonRectangle = props.appearAnchor.getBoundingClientRect();
      const x = buttonRectangle.x + buttonRectangle.width / 2;
      const y = buttonRectangle.y + buttonRectangle.height / 2;
      clipCircle.current = {
        closed: `circle(20px at ${x}px ${y}px)`,
        open: `circle(${minSafeClipRadius}px at ${x}px ${y}px)`,
      };
    }
  }, [props.appearAnchor]);

  return (
    <AnimatePresence>
      {props.show && (
        <NavElement
          variants={{
            closed: (circle: RefObject<ClipCircleStyles>) => ({
              clipPath: circle.current!.closed,
            }),
            open: (circle: RefObject<ClipCircleStyles>) => ({
              clipPath: circle.current!.open,
            }),
          }}
          initial="closed"
          animate="open"
          exit="closed"
          custom={clipCircle}
          transition={{ bounce: 0 }}
          light={props.light}
        >
          <CloseButton onClick={() => props.onClose()}>
            <CloseIcon />
          </CloseButton>
          <UL>
            {props.items.map((item, index) => (
              <li key={index}>
                <Link href={item.path} onClick={() => props.onClose()}>
                  {item.name}
                </Link>
              </li>
            ))}
          </UL>
        </NavElement>
      )}
    </AnimatePresence>
  );
};

const barVariants = (position: "top" | "bottom") => ({
  hamburger: {
    rotate: 0,
    translateX: 0,
    translateY: 0,
    originX: 1,
    originY: 0,
  },
  closed: {
    rotate: position === "top" ? -45 : 45,
    translateX: -3,
    translateY: position === "top" ? 1 : -1,
    originX: 1,
    originY: position === "top" ? 0 : 1,
  },
});

const CloseIcon = () => (
  <svg viewBox="0 0 26 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Close Navigation</title>
    <motion.rect
      variants={barVariants("top")}
      initial="hamburger"
      animate="closed"
      exit="hamburger"
      width="25"
      height="3"
      rx="0.5"
      fill="currentColor"
      transition={{ bounce: 0 }}
    />
    <motion.rect
      variants={{ hamburger: { scaleX: 1 }, closed: { scaleX: 0 } }}
      initial="hamburger"
      animate="closed"
      exit="hamburger"
      y="9.5"
      width="25"
      height="3"
      rx="0.5"
      fill="currentColor"
      transition={{ bounce: 0 }}
    />
    <motion.rect
      variants={barVariants("bottom")}
      initial="hamburger"
      animate="closed"
      exit="hamburger"
      y="19"
      width="25"
      height="3"
      rx="0.5"
      fill="currentColor"
      transition={{ bounce: 0 }}
    />
  </svg>
);
