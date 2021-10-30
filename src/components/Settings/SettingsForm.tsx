import React, { FC, ChangeEvent, useEffect, useState, FormEvent } from 'react';
import { TUser } from '../../types';
import { TCurrentUser } from '.';

type TSettingsFormProps = {
  currentUser: TUser | null,
  onSubmitForm: (currentUser: TCurrentUser) => void; 
  inProgress: boolean;
}

const SettingsForm: FC<TSettingsFormProps> = ({ currentUser, onSubmitForm, inProgress }) => {

    const [state, setState] = useState<TCurrentUser>({
      image: '',
      username: '',
      bio: '',
      email: '',
      password: ''
    });
  
    const updateState = (field: string) => (ev: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setState({ ...state, [field]: ev.target.value});
  
    useEffect(() => {
      if (currentUser) {
        setState({...state, ...currentUser})
      }
    }, [currentUser]);
  
    const submitForm = (ev: FormEvent) => {
      ev.preventDefault();
  
      const user = { ...state};
  
      onSubmitForm(user);
    };
  
    return (
      <form onSubmit={submitForm}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              value={state.image}
              onChange={updateState('image')} />
          </fieldset>
  
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Username"
              value={state.username}
              onChange={updateState('username')} />
          </fieldset>
  
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              value={state.bio}
              onChange={updateState('bio')}>
            </textarea>
          </fieldset>
  
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="email"
              placeholder="Email"
              value={state.email}
              onChange={updateState('email')} />
          </fieldset>
  
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              value={state.password}
              onChange={updateState('password')} />
          </fieldset>
  
          <button
            className="btn btn-lg btn-primary pull-xs-right"
            type="submit"
            disabled={inProgress}
          > 
            Update Settings
          </button>
  
        </fieldset>
      </form>
    );
  }

  export default SettingsForm;