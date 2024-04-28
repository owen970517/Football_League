import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import TeamLists from './TeamLists';
import TeamDetails from './TeamDetails';
import styled from 'styled-components';

function App() {
  
  return (
    <>
      <BrowserRouter>
        <div>
          <Home to='/'>Main</Home>
        </div>
        <Routes>
          <Route path='/' element={<TeamLists/>}/>
          <Route path='/:teamid' element={<TeamDetails/>}/>
        </Routes>
      </BrowserRouter>
    
    </>
  );
}
const Home = styled(Link)`
  font-size: 30px;
  text-decoration: none;
  color : #000;
`

export default App;
