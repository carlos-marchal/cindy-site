import { PortableText, PortableTextProps } from "@portabletext/react";
import styled from "styled-components";

export type PortableTextData = PortableTextProps["value"];

const HeaderElement = styled.header`
  font: var(--header-font);
  margin-bottom: 10px;
  @media (min-width: 768px) {
    font-size: 80px;
  }
`;

export interface TextRendererProps {
  children: PortableTextData;
}

export const TextRenderer = (props: TextRendererProps) => (
  <PortableText
    components={{
      block: {
        header: (props) => <HeaderElement>{props.children}</HeaderElement>,
      },
    }}
    value={props.children}
  />
);
