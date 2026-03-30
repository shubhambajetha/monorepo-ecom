'use client';
import { useState } from 'react';

const SignupForm = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-[1400px] mx-auto bg-red-500 py-10">
      <h1>Hello</h1>
    </div>
  );
};

export default SignupForm;
