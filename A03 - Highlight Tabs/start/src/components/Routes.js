import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { About } from '../pages/About';
import { Features } from '../pages/Feature';
import { Home } from '../pages/Home';

export function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      <Route path="/features">
        <Features />
      </Route>
    </Switch>
  );
}
