import React from 'react';
import { Animator } from '../Animator';
import { SignUpContext } from './SignUpContext';

export const ReviewForm = () => {
  const { profile, social } = React.useContext(SignUpContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('yoo-hoo submitting.....');
  };

  return (
    <Animator>
      <form onSubmit={handleSubmit}>
        <p>
          {' '}
          <strong>Name</strong>:{profile.name}
        </p>
        <p>
          <strong>Email</strong>:{profile.email}
        </p>
        <p>
          <strong>Twitter</strong>:{social.twitter}
        </p>
        <p>
          <strong>Facebook</strong>:{social.facebook}
        </p>
        <input type="submit" value="Submit All Info" />
      </form>
    </Animator>
  );
};
