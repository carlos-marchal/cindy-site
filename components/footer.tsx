import styled from "styled-components";

const FooterElement = styled.footer`
  margin: 0 var(--lateral-margin);
  padding-bottom: 35px;
  margin-bottom: 45px;
  --border: 2px solid var(--black);
  border-bottom: var(--border);

  @media (min-width: 768px) {
    margin-bottom: 0;
    padding: 40px 0 80px 0;
    border-bottom: none;
    border-top: var(--border);
    display: flex;
    justify-content: right;
    align-items: baseline;
  }

  span:first-child::after {
    content: " // ";
  }
`;

export const Footer = () => (
  <FooterElement>
    <span>Selected Works</span>
    <span>2021</span>
  </FooterElement>
);
