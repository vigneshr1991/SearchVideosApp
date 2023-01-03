import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Layout from "./Components/Layout/Layout";
import NoMatch from "./Components/NoMatch";

// Lazy loaded
const Videos = React.lazy(() => import ("./Components/Videos"));

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<span>Loading....</span>}>
          <Switch>
            <Route exact path="/" component={Videos} />
            <Route component={NoMatch} />
          </Switch>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;
