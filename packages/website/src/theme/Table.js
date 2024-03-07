import React from 'react';

export default function MDXTable({ children, ...props }) {
  const tableHeadings = children[0].props.children.props.children;

  const hasTheadValue = !Array.isArray(tableHeadings) || tableHeadings.every(({ props }) => props.children);

  return <table
    {...props} children={hasTheadValue ? children : children.slice(1)}
    style={{
      display: "table",
      borderRadius: "0.5rem",
      boxShadow: "inset 0 0 0 1px var(--ifm-table-border-color)",
      borderStyle: "hidden",
    }} />
}