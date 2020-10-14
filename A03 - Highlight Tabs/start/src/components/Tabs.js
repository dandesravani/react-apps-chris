import React from 'react';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { Tab } from './Tab';

export function Tabs() {
  return (
    <div className="tabs">
      <Tab>
        <NavLink to="/" exact={true} activeClassName="is-active">
          Home
        </NavLink>
      </Tab>
      <Tab>
        <NavLink to="/about" exact={true} activeClassName="is-active">
          About
        </NavLink>
      </Tab>
      <Tab>
        <NavLink to="/features" exact={true} activeClassName="is-active">
          Feature
        </NavLink>
      </Tab>
    </div>
  );
}
