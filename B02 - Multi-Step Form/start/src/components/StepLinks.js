import React from 'react';
import { NavLink } from 'react-router-dom';
import { SignUpContext } from './SignUpContext';

function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export const StepLinks = () => {
  const { profile, social } = React.useContext(SignUpContext);

  console.log(isEmpty(profile));
  const isProfileDone = !isEmpty(profile);
  const isSocialDone = !isEmpty(social);

  return (
    <div className="step-links">
      <NavLink to="/" exact>
        {isProfileDone ? '💗' : '♥'} Profile
      </NavLink>
      <NavLink to="/social">{isProfileDone ? '💗' : '♥'} ProfileSocial</NavLink>
      <NavLink to="/review" style={{ float: 'right' }}>
        {isProfileDone && isSocialDone ? '💗' : '♥'}Review
      </NavLink>
    </div>
  );
};
