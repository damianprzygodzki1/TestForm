import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateFormAction } from '../store/store';

function Form() {
  const formState = useSelector(state => state.form);
  const dispatch = useDispatch();

  const handleChange = (field, value) => {
    dispatch(updateFormAction({ field, value }));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="First Name"
        value={formState.firstName}
        onChange={e => handleChange('firstName', e.target.value)}
      />
      <input
        type="text"
        placeholder="Last Name"
        value={formState.lastName}
        onChange={e => handleChange('lastName', e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={formState.email}
        onChange={e => handleChange('email', e.target.value)}
      />
      <textarea
        placeholder="Message"
        value={formState.message}
        onChange={e => handleChange('message', e.target.value)}
      />
    </div>
  );
}

export default Form;