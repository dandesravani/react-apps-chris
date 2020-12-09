import React from 'react';
import './App.css';
import useInterval from '@use-it/interval';
import { motion } from 'framer-motion';

const messages = [
  { text: 'How do I get better at React?' },
  { text: 'Just build something!' },
  { text: 'OK! What should I build?' },
  { text: 'Iono. Just Google it?' },
  { text: 'Oh! This course looks cool!' },
  { text: 'Send me the link?!' },
  { text: '20ReactApps.com!' },
];

export const Message = ({ index, message }) => {
  return (
    <motion.div
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      key={index}
      className="message"
    >
      <span role="img" aria-label="user1" className="avatar">
        🐸
      </span>
      <div className="text">{message.text}</div>
      <span role="img" aria-label="user2" className="avatar">
        🐶
      </span>
    </motion.div>
  );
};

export const Typing = ({ even }) => {
  return (
    <div className={`typing ${even ? 'is-right' : 'is-left'}`}>
      <div className="dots">
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};

export default function App() {
  const [messageToShow, setMessageToShow] = React.useState(0);
  useInterval(() => {
    setMessageToShow((msg) => msg + 1);
  }, 2000);

  return (
    <div className="app">
      <div className="walkthrough">
        {messages.map((message, index) => {
          const even = index % 2 === 0;
          if (messageToShow + 1 === index) {
            return <Typing key={index} even={even} />;
          }
          if (index > messageToShow) {
            return <div key={index} />;
          }
          return <Message key={index} message={message} index={index} />;
        })}
      </div>
    </div>
  );
}
