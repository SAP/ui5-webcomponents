import React, { useState } from 'react';
import clsx from "clsx";
import SAPIcons from "../../icons/index.js";
import SAPTNTIcons from "../../icons-tnt/index.js";
import SAPBSIcons from "../../icons-business-suite/index.js";
import Layout from '@theme/Layout';
import "./icons.css";


const Select = ({ updateState }) => {
  const [ collection, setCollection ] = useState("SAP Icons");

  return <div className="segmented__button">
    <div
        onClick={() => { 
          setCollection("SAP Icons") 
          updateState("SAP Icons");
        }}
        className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "SAP Icons" })}
    >SAP Icons</div>
    <div
        onClick={() => { 
          setCollection("SAP TNT Icons");
          updateState("SAP TNT Icons");
        }}
        className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "SAP TNT Icons" })}
    >SAP TNT Icons</div>

    <div
        onClick={() => { 
          setCollection("SAP BS Icons");
          updateState("SAP BS Icons");
        }}
        className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "SAP BS Icons" })}
    >SAP BS Icons</div>
  </div>;
};


const Collection = ({ currCollection }) => { 
  if (currCollection === "SAP TNT Icons") {
      return <SAPTNTIcons />
  } else if (currCollection === "SAP BS Icons") {
      return <SAPBSIcons />
  }

  return <SAPIcons />
};

export default function Icons() {
  const [ collection, setCollection ] = useState("SAP Icons");

  return (
    <Layout title="UI5 Web Components Icons" description="UI5 Web Components Icons">
      <Select updateState={setCollection}/>
      <Collection currCollection={collection}/>
    </Layout>
  );
};
