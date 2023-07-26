import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import BlogList from './BlogList';
import BlogDetail from './BlogDetail';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={BlogList} />
        <Route path="/blog/:id" component={BlogDetail} />
      </Switch>
    </Router>
  );
}

export default App;
