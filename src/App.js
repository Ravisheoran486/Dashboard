import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Data from './components/Data.tsx';
// import Mock from '@visx/mock-data'
import PieChart from './components/PieChart.tsx';
// import {genRandomNormalPoints} from './generators/genRandomNormalPoints'
function App() {
  


  return (
    <div className='w-full h-full bg-grey-200 flex  '>
      <Data></Data>
      <PieChart />
    </div>
  );
}

export default App;
