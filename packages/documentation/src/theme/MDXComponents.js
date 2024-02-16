import React from 'react';
// Import the original mapper
import MDXComponents from '@theme-original/MDXComponents';
import Editor from '@site/src/components/Editor';
import APIDocs from '@site/src/components/APIDocs';
import FieldsTable from '@site/src/components/APIDocs/FieldsTable';
import MethodsTable from '@site/src/components/APIDocs/MethodsTable';
import EventsTable from '@site/src/components/APIDocs/EventsTable';
import SlotsTable from '@site/src/components/APIDocs/SlotsTable';
import CssPartsTable from '@site/src/components/APIDocs/CssPartsTable';

export default {
  // Re-use the default mapping
  ...MDXComponents,
  Editor,
  APIDocs,
  FieldsTable,
  MethodsTable,
  EventsTable,
  SlotsTable,
  CssPartsTable,
};