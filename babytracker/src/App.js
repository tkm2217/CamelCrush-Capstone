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
      <Navbar />
      <br/>
      <Route path="/" exact compnent ={TrackerList} />
      <Route path="/edit/:id" exact compnent ={EditTracker} />
      <Route path="/create" exact compnent ={CreateTracker} />
      <Route path="/user" exact compnent ={CreateUser} />
    </Router>
  );
}

export default App;
