import './App.css';
import AppRouter from "../routes/Route";
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import '../styles';

const App = (props) => {
  return (
    <Router >
      <div>
        <AppRouter {...props} />
      </div>
    </Router>
  );
};

export default App;
