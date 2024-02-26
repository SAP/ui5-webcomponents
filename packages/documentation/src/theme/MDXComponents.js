import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Editor from '@site/src/components/Editor';
import PropsTable from '@site/src/components/APIDocs/PropsTable';
import MethodsTable from '@site/src/components/APIDocs/MethodsTable';
import EventsTable from '@site/src/components/APIDocs/EventsTable';
import SlotsTable from '@site/src/components/APIDocs/SlotsTable';
import EnumFieldsTable from "@site/src/components/APIDocs/EnumFieldsTable"

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Editor,
  PropsTable,
  MethodsTable,
  EventsTable,
  SlotsTable,
  EnumFieldsTable
};