import React from 'react';
import ReactMarkDown from 'react-markdown';
import './App.css';

export default function App() {
  const [markdown, setMarkdown] = React.useState('# sup');
  return (
    <div className="app">
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
      />

      <ReactMarkDown className="preview" source={markdown} />
    </div>
  );
}
