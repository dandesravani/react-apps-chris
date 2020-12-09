import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { Animator } from '../Animator';
import { SignUpContext } from './SignUpContext';

export const SocialForm = () => {
  const { social, setSocial } = React.useContext(SignUpContext);
  const { register, handleSubmit, errors } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    setSocial(data);
    history.push('/review');
  };

  return (
    <Animator>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>How can we find you on social</h2>
        <input
          type="text"
          name="twitter"
          placeholder="What's your twitter?"
          defaultValue={social.twitter}
          ref={register({ required: true })}
        />

        <p>{errors.twitter && 'Twitter is required.'}</p>
        <input
          type="text"
          name="facebook"
          placeholder="What's your Facebook?"
          defaultValue={social.facebook}
          ref={register({ required: true })}
        />
        <p>{errors.facebook && 'Facebook is required.'}</p>
        <input type="submit" value="Next" />
      </form>
    </Animator>
  );
};
