import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../AuthContext';
import SignupPage from './SignupPage';
export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('login');
  const { login } = useContext(AuthContext);
  const handleLogin = async () => {
    const r = await axios.post('http://localhost:3000/api/auth/login', { username, password });
    login(r.data.token, r.data.username);
  };
  if (mode === 'signup') return <SignupPage onDone={() => setMode('login')} />;
  return (
    <div className="mainsignup">
      <div className="mainsignup1">
      <h2 className="mainsignup2">Login</h2>
      <input className="mainsignup3" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" className="mainsignup3" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button className="mainsignup5" onClick={handleLogin}>Login</button>
      <p className="mt-2">No account? <button className="mainsignup5" onClick={() => setMode('signup')}>Signup</button></p>
      </div>
    </div>
  );
}