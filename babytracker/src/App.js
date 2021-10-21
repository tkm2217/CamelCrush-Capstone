import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import TrackerList from "./components/tracker-list.component";
import EditTracker from "./components/edit-tracker.component";
import CreateTracker from "./components/create-tracker.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component ={TrackerList} />
        <Route path="/edit/:id" component ={EditTracker} />
        <Route path="/create" component ={CreateTracker} />
        <Route path="/user" component ={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
