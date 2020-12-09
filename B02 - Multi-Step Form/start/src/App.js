import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { SignUpForm } from './components/SignUpForm';

export default function App() {
  return (
    <Router>
      <div className="app">
        <SignUpForm />
      </div>
    </Router>
  );
}
