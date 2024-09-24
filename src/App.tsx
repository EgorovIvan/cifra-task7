import * as React from 'react';
import {LoggerProvider} from './contexts/LoggerContext';
import { CoordinateLogger } from './components/CoordinateLogger';
import './App.scss';
import {useEffect, useState} from "react";

const App: React.FC = () => {

  const [test, setTest] = useState(false);

  useEffect(() => {
    if (!test) setTimeout(() => setTest(true), 5000);
  }, [test]);

  return (
    <LoggerProvider>

      <div className="app">
        <CoordinateLogger>
          <div className="app__child">Child 1</div>
          <div className="app__child">Child 2</div>
          <div className="app__child-2">Child 3</div>
          { test && <div className="app__child-3">Child 4</div>}
        </CoordinateLogger>

        <CoordinateLogger>
          <div className="app__child">Child 1</div>
          <div className="app__child">Child 2</div>
        </CoordinateLogger>

        <CoordinateLogger>
          <div className="app__child">Child 1</div>
        </CoordinateLogger>

      </div>
    </LoggerProvider>
  );
};

export default App;
