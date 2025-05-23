import React, { useContext } from 'react';
import { AuthProvider, AuthContext } from './AuthContext';
import LoginPage from './components/LoginPage';
import ChatPage from './components/ChatPage';
export default function App() {
  return <AuthProvider><Main/></AuthProvider>;
}
function Main() {
  const { token } = useContext(AuthContext);
  return token ? <ChatPage/> : <LoginPage/>;
}