import React from "react";

export const textConfig = [
  {
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      {
        title: "Header",
        value: "header",
        blockEditor: {
          render: (props) => (
            <span style={{ fontSize: "1.5em" }}>{props.children}</span>
          ),
        },
      },
    ],
  },
];
