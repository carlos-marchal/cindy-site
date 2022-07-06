import styled from "styled-components";
import { SiteContactInformation } from "../sanity-client/config";
import { Arrow } from "./arrow";

export interface FooterProps {
  contact: SiteContactInformation;
  showBackToTop?: boolean;
}

const FooterElement = styled.footer`
  background: var(--black);
  color: var(--white);
  padding: var(--lateral-margin);

  display: grid;
  grid-auto-flow: column;
  grid-template-columns: 2fr 1fr;

  ::after {
    content: "";
    grid-row: 2;
    grid-column: 1 / 3;
    border: 1px solid currentColor;
    margin: 20px 0;
  }

  @media (min-width: 768px) {
    padding: 50px var(--lateral-margin);
    grid-auto-flow: row;
    grid-template-columns: 1fr;

    ::after {
      content: "";
      grid-row: 3;
      grid-column: 1 / 2;
    }
  }
`;

const FooterLinks = styled.div`
  display: grid;
  gap: 10px;

  a {
    text-decoration: none;
  }

  @media (min-width: 768px) {
    grid-auto-flow: column;
    justify-content: space-between;
  }
`;

const BackToTop = styled.div`
  place-self: end;
  margin-bottom: 10px;

  button:hover {
    color: var(--highlight);
  }

  @media (min-width: 768px) {
    order: -1;
    margin: 40px 0;

    ::after {
      content: "";
      grid-row: 3;
      grid-column: 1 / 2;
    }
  }
`;

export const Footer = (props: FooterProps) => (
  <FooterElement>
    <FooterLinks>
      <a href={`mailto:${props.contact.email}`}>{props.contact.email}</a>
      <a href={props.contact.linkedin_url} target="_blank" rel="noreferrer">
        Linkedin
      </a>
      <a href={props.contact.instagram_url} target="_blank" rel="noreferrer">
        Instagram
      </a>
      <a href={`tel:${props.contact.phone}`}>{props.contact.phone}</a>
      <span>{props.contact.location}</span>
    </FooterLinks>
    {props.showBackToTop && (
      <BackToTop>
        <Arrow
          direction="up"
          onClick={() => window.scroll({ top: 0, behavior: "smooth" })}
        >
          Back to top
        </Arrow>
      </BackToTop>
    )}
  </FooterElement>
);
