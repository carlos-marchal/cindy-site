import React from "react";

const HeaderComponent = (props) => (
  <span style={{ fontSize: "1.5em" }}>{props.children}</span>
);

export const textConfig = [
  {
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      {
        title: "Header",
        value: "header",
        component: HeaderComponent,
      },
    ],
  },
];
