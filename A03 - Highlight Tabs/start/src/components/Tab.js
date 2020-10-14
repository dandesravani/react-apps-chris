import React from 'react';

export function Tab({ children }) {
  const [highlight, setHighlight] = React.useState({ left: 0, opacity: 0 });
  const moveHighlight = (e) => {
    setHighlight({ left: e.nativeEvent.layerX - 150, opacity: 1 });
  };

  const hideHighlight = (e) => {
    setHighlight({ left: e.nativeEvent.layerX - 150, opacity: 0 });
  };
  return (
    <div className="tab" onMouseOut={hideHighlight} onMouseMove={moveHighlight}>
      <div className="highlight" style={highlight} />
      {children}
    </div>
  );
}
