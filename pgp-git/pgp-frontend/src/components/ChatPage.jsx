// import React, { useState, useContext } from 'react';
// import axios from 'axios';
// import { AuthContext } from '../AuthContext';
// export default function ChatPage() {
//   const { token, username, interactions, setInteractions, logout } = useContext(AuthContext);
//   const [te, setTe] = useState('');
//   const [td, setTd] = useState('');
//   const [enc, setEnc] = useState('');
//   const [dec, setDec] = useState('');
//   const [fe, setFe] = useState(null);
//   const [fd, setFd] = useState(null);
//   const api = axios.create({ baseURL: 'https://ncsa-interview.onrender.com', headers: { Authorization: `Bearer ${token}` } });
//   const log = (type, input, output) => {
//     const rec = { user: { username }, type, input, output, timestamp: new Date().toISOString() };
//     setInteractions([rec, ...interactions]);
//   };
//   const encryptText = async () => { const r = await api.post('/pgp/encrypt-text', { text: te }); setEnc(r.data.encrypted); log('encrypt-text', te, r.data.encrypted); };
//   const decryptText = async () => { const r = await api.post('/pgp/decrypt-text', { encryptedText: td }); setDec(r.data.decrypted); log('decrypt-text', td, r.data.decrypted); };
//   const encryptFile = async () => { if(!fe) return; const fd = new FormData(); fd.append('file', fe); const r = await api.post('/pgp/encrypt-file', fd, { responseType: 'blob' }); const url = URL.createObjectURL(r.data); const a = document.createElement('a'); a.href=url; a.download='encrypted.pgp'; a.click(); log('encrypt-file', fe.name, 'encrypted.pgp'); };
//   const decryptFile = async () => { if(!fd) return; const fr = new FormData(); fr.append('file', fd); const r = await api.post('/pgp/decrypt-file', fr, { responseType: 'blob' }); const url = URL.createObjectURL(r.data); const a = document.createElement('a'); a.href=url; a.download='decrypted.txt'; a.click(); log('decrypt-file', fd.name, 'decrypted.txt'); };
//   return (
//     <div className="main">
//       <div className="main1"><h2>Hi, {username}</h2><button onClick={logout} className="text-red-500">Logout</button></div>
//       <div className="main2">{interactions.map((it,i)=>(<div key={i} className="border p-2 rounded"><div className="text-xs text-gray-600">{it.user.username} @ {new Date(it.timestamp).toLocaleString()}</div><div><strong>{it.type}</strong></div><div>In: {it.input}</div><div>Out: {it.output}</div></div>))}</div>
//       <div className="main3">
//         <div><textarea rows={2} className="w-full border p-2" placeholder="Text to encrypt" value={te} onChange={e=>setTe(e.target.value)}/><button className="ml-2 bg-blue-500 text-white px-2 py-1" onClick={encryptText}>Encrypt</button>{enc && <pre className="bg-gray-100 p-2 mt-1">{enc}</pre>}</div>
//         <div><textarea rows={2} className="w-full border p-2" placeholder="Encrypted text" value={td} onChange={e=>setTd(e.target.value)}/><button className="ml-2 bg-blue-500 text-white px-2 py-1" onClick={decryptText}>Decrypt</button>{dec && <pre className="bg-gray-100 p-2 mt-1">{dec}</pre>}</div>
//         <div><input type="file" onChange={e=>setFe(e.target.files[0])}/><button className="ml-2 bg-blue-500 text-white px-2 py-1" onClick={encryptFile}>Encrypt File</button></div>
//         <div><input type="file" onChange={e=>setFd(e.target.files[0])}/><button className="ml-2 bg-blue-500 text-white px-2 py-1" onClick={decryptFile}>Decrypt File</button></div>
//       </div>
//     </div>
//   );
// }












import axios from 'axios';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../AuthContext';
export default function ChatPage() {
  const { token, username, interactions, setInteractions, logout } = useContext(AuthContext);
  const [te, setTe] = useState('');
  const [td, setTd] = useState('');
  const [enc, setEnc] = useState('');
  const [dec, setDec] = useState('');
  const [fe, setFe] = useState(null);
  const [fd, setFd] = useState(null);

  const api = axios.create({ 
    baseURL: 'https://ncsa-interview.onrender.com', 
    headers: { Authorization: `Bearer ${token}` } 
  });

  const log = (type, input, output) => {
    const rec = { user: { username }, type, input, output, timestamp: new Date().toISOString() };
    setInteractions([rec, ...interactions]);
  };

  const encryptText = async () => { 
    const r = await api.post('/pgp/encrypt-text', { text: te });
    setEnc(r.data.encrypted); log('encrypt-text', te, r.data.encrypted); 
  };

  const decryptText = async () => { 
    const r = await api.post('/pgp/decrypt-text', { encryptedText: td });
    setDec(r.data.decrypted); log('decrypt-text', td, r.data.decrypted); 
  };

  const encryptFile = async () => { 
    if(!fe) return; 
    const fd = new FormData(); 
    fd.append('file', fe); 
    const r = await api.post('/pgp/encrypt-file', fd, { responseType: 'blob' }); 
    const url = URL.createObjectURL(r.data); 
    const a = document.createElement('a'); 
    a.href=url; 
    a.download='encrypted.pgp'; 
    a.click(); log('encrypt-file', fe.name, 'encrypted.pgp');
  };

  const decryptFile = async () => { if(!fd) return;
    const fr = new FormData(); fr.append('file', fd); 
    const r = await api.post('/pgp/decrypt-file', fr, { responseType: 'blob' });
    const url = URL.createObjectURL(r.data);
    const a = document.createElement('a');
    a.href=url;
    a.download='decrypted.txt'; 
    a.click(); 
    log('decrypt-file', fd.name, 'decrypted.txt'); 
  };

  return (
    <div className="main">
      <div className="main1"><h2>Hi, {username}</h2><button onClick={logout} className="main2">Logout</button></div>
      <div className="main3">{interactions.map((it,i)=>(<div key={i} className="main4">
       
       
        <div className="main5">{it.user.username} @ {new Date(it.timestamp).toLocaleString()}
        <div className="main5"><strong>{it.type}</strong>
        </div>
      <div className="main14">In: {it.input}</div>
      <div className="main14">Out: {it.output}</div>
      </div>
      </div>))}</div>


      <div >
        <div><textarea rows={2} className="main9" placeholder="Text to encrypt" value={te} onChange={e=>setTe(e.target.value)}/>
          <button className="main10" onClick={encryptText}>Encrypt</button>
          {enc && <pre className="main5">{enc}</pre>}
          </div>
        <div><textarea rows={2} className="main9" placeholder="Text to decrypt" value={td} onChange={e=>setTd(e.target.value)}/>
          <button className="main10" onClick={decryptText}>Decrypt</button>
          {dec && <pre className="main11">{dec}</pre>}
          </div>
        <div><input type="file" onChange={e=>setFe(e.target.files[0])}/>
        <button className="main12" onClick={encryptFile}>Encrypt File</button>
        </div>
        <div><input type="file" onChange={e=>setFd(e.target.files[0])}/>
        <button className="main12" onClick={decryptFile}>Decrypt File</button>
        </div>
      </div>
    </div>
  );
}