import React from 'react';
import { filter } from "../filter.util.js"

const Input = ({ sidebar, updateItems }) => {
  return (
      <div style={{ paddingInlineEnd: "0.5rem", paddingBlockEnd: "0.5rem" }}>
        <input
          className="filter"
          type='search'
          autocomplete='off'
          onChange={(e) => {
            const coppiedArray = filter(JSON.parse(JSON.stringify(sidebar)), e.target.value);

            updateItems(coppiedArray);
          }}
          aria-label='Filter'
          placeholder='Filter...'
          style={{ width: "100%" }} />
      </div>
  );
};
export default React.memo(Input);
