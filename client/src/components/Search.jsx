import React from 'react';

const Search = (props) => {
  const setFilter = (event) =>
    props.setFilter(event.target.nextSibling.value.trim().toLowerCase());

  return (
    <form>
      <button type='button' onClick={setFilter}>
        Go!
      </button>
      <input type='text' placeholder='Search...'/>
    </form>
  );
};

export default Search;
