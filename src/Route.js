import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ChuckNorris from './ChuckNorris';
import FactDetails from './FactDetails';

function App() {
  return (
    <Router>
      <Route path="/facts">
        <Route exact path="/" component={ChuckNorris} />
        <Route path="/details/:factId" component={FactDetails} />
      </Route>
    </Router>
  );
}

export default App;
