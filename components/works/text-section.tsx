import styled from "styled-components";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface TextSectionData {
  _type: "text_section";
  content: PortableTextData;
}

const TextSectionElement = styled.section`
  margin: var(--lateral-margin);
  margin-top: 0;
  p:not(:last-child) {
    margin-bottom: 30px;
  }
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: fit-content(1000px);
    justify-content: center;
    text-align: center;
  }
`;

export interface TextSectionProps {
  children: TextSectionData;
}

export const TextSection = (props: TextSectionProps) => (
  <TextSectionElement>
    <TextRenderer>{props.children.content}</TextRenderer>
  </TextSectionElement>
);
