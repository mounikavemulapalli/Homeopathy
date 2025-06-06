/** @format */

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import CaseSheetForm from "./Components/CaseSheetForm";
import FollowUpForm from "./Components/FollowUpForm";
import CasesList from "./Components/CasesList";
import "./App.css"; // This should style your bottom tabs
import FollowUpList from "./Components/FollowUpList";
import FollowUpPage from "./Components/FollowUpPage";
// Bottom tab component
const BottomTabs = () => {
  return (
    <div className='bottom-tabs'>
      <NavLink to='/' className='tab-link' end>
        📝 New Case
      </NavLink>
      <NavLink to='/followup' className='tab-link'>
        🔁 Follow Up
      </NavLink>
      <NavLink to='/cases' className='tab-link'>
        📋 Cases
      </NavLink>
    </div>
  );
};

// Main app component
const App = () => {
  return (
    <Router>
      <div className='content'>
        <Routes>
          <Route path='/' element={<CaseSheetForm />} />
          {/* <Route path='/followup' element={<FollowUpForm />} /> */}
          <Route path='/cases' element={<CasesList />} />
          <Route path='/followup' element={<FollowUpPage />} />
          {/* <Route path='/followuplist' element={<FollowUpList />} /> */}
        </Routes>
        <BottomTabs />
      </div>
    </Router>
  );
};

export default App;
