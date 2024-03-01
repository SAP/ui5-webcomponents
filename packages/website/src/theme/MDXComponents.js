import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Editor from '@site/src/components/Editor';
import MDXTable from './Table';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Editor,
  table: MDXTable,
};