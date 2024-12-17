import React from 'react';
import { filter } from "../filter.util.js"

const Input = ({ sidebar, updateItems }) => {
  return (
      <div className="filterWrapper">
        <input
          className="filter"
          type='search'
          autoComplete='off'
          onChange={(e) => {
            const coppiedArray = filter(JSON.parse(JSON.stringify(sidebar)), e.target.value);

            updateItems(coppiedArray);
          }}
          aria-label='Filter'
          placeholder='Filter...' />
      </div>
  );
};
export default React.memo(Input);
