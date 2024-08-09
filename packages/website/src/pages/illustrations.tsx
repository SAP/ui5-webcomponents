import React, { useState } from 'react';
import clsx from "clsx";
import SAPIllustrations from "../../illustrations/index.js";
import TNTIllustrations from "../../illustrations-tnt/index.js";
import Layout from '@theme/Layout';
import "./illustrations.css";
import "./css_variables.css";


const Select = ({ updateState }) => {
  const [collection, setCollection] = useState("SAP Illustration");

  return <div className="segmented__button">
    <div
      onClick={() => {
        setCollection("SAP Illustration")
        updateState("SAP Illustration");
      }}
      className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "SAP Illustration" })}
    >SAP Illustration</div>
    <div
      onClick={() => {
        setCollection("TNT Illustration");
        updateState("TNT Illustration");
      }}
      className={clsx("segmented__button__item", { 'segmented__button__item--active': collection === "TNT Illustration" })}
    >TNT Illustration</div>
  </div>;
};

const Collection = ({ currCollection }) => { 
  if (currCollection === "TNT Illustration") {
      return <TNTIllustrations />
  }

  return <SAPIllustrations />
};



export default function Icons() {
  const [collection, setCollection] = useState("SAP Illustration");

  return (
    <Layout title="UI5 Web Components Icons" description="UI5 Web Components Icons">
      <Select updateState={setCollection} />
      <Collection currCollection={collection}/>
    </Layout>
  );
};
