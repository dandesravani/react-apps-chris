import React from 'react';
import './App.css';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const Number = ({ text }) => {
  const [{ opacity }, drag] = useDrag({
    item: { type: 'number', number: text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });
  return (
    <div className="card" ref={drag} style={{ opacity }}>
      {text}
    </div>
  );
};

export const Operator = ({ text }) => {
  const [{ opacity }, drag] = useDrag({
    item: { type: 'operator', operator: text },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.5 : 1,
    }),
  });

  return (
    <div className="card" ref={drag} style={{ opacity }}>
      {text}
    </div>
  );
};

export const Spot = ({ type, children, text }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: type,
    drop: (item) => {},
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  let backgroundColor = '#f2f2f2';
  if (canDrop) backgroundColor = '#3db897';
  if (isOver) backgroundColor = '#4bdcb5';

  return (
    <div className="spot" ref={drop} style={{ backgroundColor }}>
      {text}
    </div>
  );
};

export default function App() {
  const [num1, setNum1] = React.useState(1);
  const [num2, setNum2] = React.useState(1);
  const [operator, setOperator] = React.useState('+');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        {/* math card */}
        <div className="math-card">
          <Spot type="number" text={num1} />
          <Spot type="number" text={num2} />
          <Spot type="operator" text={operator} />
          <div className="total">{eval(`${num1} ${operator} ${num2}`)}</div>
        </div>

        <div>
          <div className="cards numbers">
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Number key={i} text={i} />
              ))}
          </div>

          <div className="cards operators">
            {['*', '-', '+', '/'].map((o, i) => (
              <Operator text={o} key={i} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
