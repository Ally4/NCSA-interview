import axios from 'axios';
import React, { useState } from 'react';
export default function SignupPage({ onDone }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleSignup = async () => {
    await axios.post('https://ncsa-interview.onrender.com/api/auth/signup', { username, password });
    alert('Signup successful');
    onDone();
  };
  return (
    <div className="mainsignup">
      <div className="mainsignup1">
      <h2 className="mainsignup2">Signup</h2>
      <input className="mainsignup3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" className="mainsignup4" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="mainsignup5" onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
}