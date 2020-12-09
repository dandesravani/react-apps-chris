import React, { useContext } from 'react';
import { Route } from 'react-router-dom';
import { NavLink, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import { ProfileForm } from './ProfileForm';
import { ReviewForm } from './ReviewForm';
import { SignUpContext, SignUpContextProvider } from './SignUpContext';
import { SocialForm } from './SocialForm';
import { AnimatePresence } from 'framer-motion';
import { StepLinks } from './StepLinks';

export const SignUpForm = () => {
  return (
    <SignUpContextProvider>
      <div className="signup-form">
        <StepLinks />
        <AnimatePresence>
          <Switch>
            <Route path="/" exact component={ProfileForm} />
            <Route path="/social" component={SocialForm} />
            <Route path="/review" component={ReviewForm} />
          </Switch>
        </AnimatePresence>
      </div>
    </SignUpContextProvider>
  );
};
