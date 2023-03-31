import React from 'react';
//importing components
import Card from './components/Card';
import Attribution from './components/Attribution';
//importing styles
import './css/app.css';
const App = () => {
  return (
    <div className="app__container">
      <div className="background__top">
        <img src="./images/bg-pattern-top.svg" alt="" />
      </div>
      <Card />
      <Attribution />
      <div className="background__bottom">
        <img src="./images/bg-pattern-bottom.svg" alt="" />
      </div>
    </div>
  );
};

export default App;
