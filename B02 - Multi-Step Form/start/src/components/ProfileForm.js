import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Animator } from '../Animator';
import { SignUpContext } from './SignUpContext';

export const ProfileForm = () => {
  const { profile, setProfile } = useContext(SignUpContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    setProfile(data);
    history.push('/social');
  };

  return (
    <Animator>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Tell us about yourself </h2>
        <input
          type="text"
          name="name"
          placeholder="What's your name?"
          defaultValue={profile.name}
          ref={register({ required: true })}
        />

        <p>{errors.name && 'Name is required.'}</p>
        <input
          type="email"
          name="email"
          defaultValue={profile.email}
          placeholder="What's your email?"
          ref={register({ required: true })}
        />
        <p>{errors.name && 'email is required.'}</p>
        <input type="submit" value="Next" />
      </form>
    </Animator>
  );
};
