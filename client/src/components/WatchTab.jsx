import React from 'react';

const WatchTab = (props) => {
  let active = props.intent === props.current;
  return (
    <button
      type='button'
      className={active ? 'green' : undefined}
      onClick={() => props.set(active ? null : props.intent)}
    >
      {props.intent ? 'Watched' : 'To Watch'}
    </button>
  );
};

export default WatchTab;
