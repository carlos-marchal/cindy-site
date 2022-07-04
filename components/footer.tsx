import styled from "styled-components";
import { SiteContactInformation } from "../sanity-client/config";

export interface FooterProps {
  contact: SiteContactInformation;
}

const FooterElement = styled.footer`
  background: var(--black);
  color: var(--white);
  display: grid;
  padding: var(--lateral-margin);
  gap: 10px;

  a {
    text-decoration: none;
  }

  ::after {
    content: "";
    border: 1px solid currentColor;
    margin: 10px 0;
  }

  @media (min-width: 768px) {
    grid-auto-flow: column;
    justify-content: space-between;
    padding: 50px var(--lateral-margin);
    ::after {
      grid-column: 1 / 6;
      grid-row: 2;
    }
  }
`;

export const Footer = (props: FooterProps) => (
  <FooterElement>
    <a href={`mailto:${props.contact.email}`}>{props.contact.email}</a>
    <a href={props.contact.linkedin_url}>Linkedin</a>
    <a href={props.contact.instagram_url}>Instagram</a>
    <a href={`tel:${props.contact.phone}`}>{props.contact.phone}</a>
    <span>{props.contact.location}</span>
  </FooterElement>
);
