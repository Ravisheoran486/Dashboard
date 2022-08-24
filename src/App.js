import React from 'react';
// import logo from './logo.svg';
import './App.css';
import Data from './components/Data.tsx';
// import Mock from '@visx/mock-data'
import PieChart from './components/PieChart.tsx';
import GradientGraph from './components/GradientGraph.tsx';
import BarGraph from './components/BarGraph.tsx';
// import {genRandomNormalPoints} from './generators/genRandomNormalPoints'
function App() {
  


  return (
    <div className='flex flex-wrap bg-grey-200  border-4 border-green-900 h-full w-full '>
      {/* <Data></Data> */}
      
      <PieChart />
      <GradientGraph />
      <BarGraph />
    </div>
  );
}

export default App;
