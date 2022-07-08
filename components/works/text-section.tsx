import { motion } from "framer-motion";
import styled from "styled-components";
import { PortableTextData, TextRenderer } from "./text-renderer";

export interface TextSectionData {
  _type: "text_section";
  content: PortableTextData;
}

const TextSectionElement = styled(motion.section)`
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
  <TextSectionElement
    initial={{ opacity: 0, translateY: -50 }}
    whileInView={{ opacity: 1, translateY: 0 }}
    transition={{ delay: 0.5 }}
    viewport={{ once: true }}
  >
    <TextRenderer>{props.children.content}</TextRenderer>
  </TextSectionElement>
);
