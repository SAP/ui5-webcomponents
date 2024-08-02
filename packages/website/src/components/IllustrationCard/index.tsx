import React, { useLayoutEffect, useState } from 'react';

export default function IllustrationCard({ name, prefix }) {
  let [size, setSize] = useState("Scene")
  const [svgWidth, setSvgWidth] = useState("0");
  const [svgHeight, setSvgHeight] = useState("0");
  const selector = `#${prefix}-${size}-${name}`;

  useLayoutEffect(() => {
    setSvgHeight(document.querySelector(selector).getAttribute("height"))
    setSvgWidth(document.querySelector(selector).getAttribute("width"))
  }, [size]);


return <div className="illustration__wrapper" data-illustration-name={name}>
    <div className="illustration__wrapper__svg">
      <svg width={svgWidth} height={svgHeight}>
        <use href={selector}/>
      </svg>

    </div>
    <span className="illustration__wrapper__title">{name}</span>

    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button className="button button--secondary illustration__button--copy" title="Set illustration to Dot size" onClick={() => setSize("Dot")}>
        Dot
      </button>
      <button className="button button--secondary illustration__button--picture" title="Set illustration to Spot size" onClick={() => setSize("Spot")}>
        Spot
      </button>
      <button className="button button--secondary illustration__button--picture" title="Set illustration to Dialog size" onClick={() => setSize("Dialog")}>
        Dialog
      </button>
      <button className="button button--secondary illustration__button--picture" title="Set illustration to Scene size" onClick={() => setSize("Scene")}>
        Scene
      </button>
    </div>
  </div>
}