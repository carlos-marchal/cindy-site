import React from "react";

// Custom component for header style (v3.1+ syntax)
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
        // v3.1+ uses 'component' instead of 'blockEditor.render'
        component: HeaderComponent,
      },
    ],
  },
];
