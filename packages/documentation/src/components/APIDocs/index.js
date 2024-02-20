import React from 'react';
import PropsTable from './PropsTable';
import MethodsTable from './MethodsTable';
import EventsTable from './EventsTable';
import SlotsTable from './SlotsTable';
import CssPartsTable from './CssPartsTable';


export default function APIDocs({ declaration, kind }) {
  switch (kind) {
    case "enum":
      return "enum";
    case "field":
      return <PropsTable declaration={declaration} />;
    case "method":
      return <MethodsTable declaration={declaration} />;
    case "event":
      return <EventsTable declaration={declaration} />;
    case "cssPart":
      return <CssPartsTable declaration={declaration} />;
    case "slot":
      return <SlotsTable declaration={declaration} />;
    default:
      return "Default";
  }
}