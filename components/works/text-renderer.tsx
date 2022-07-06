import { PortableText, PortableTextProps } from "@portabletext/react";
import Link from "next/link";
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
      marks: {
        link: (props) =>
          props.value.href.includes(":") ? (
            <a href={props.value.href} target="_blank" rel="noreferrer">
              {props.children}
            </a>
          ) : (
            <Link href={props.value.href}>
              <a>{props.children}</a>
            </Link>
          ),
      },
    }}
    value={props.children}
  />
);
