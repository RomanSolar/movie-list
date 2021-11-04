import React from 'react';

const AddMovie = (props) => {
  const addMovie = (event) => {
    const input = event.target.nextSibling;
    const value = input.value.trim();
    if (value) {
      props.addMovie(value);
    }
    input.value = '';
  };

  return (
    <form>
      <button type='button' onClick={addMovie} className='green'>
        Add
      </button>
      <input type='text' placeholder='Add movie title here'/>
    </form>
  );
};

export default AddMovie;

