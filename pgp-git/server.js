import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import * as openpgp from 'openpgp';
import multer from 'multer';
import path from 'path';
import User from './models/User.js';
import Interaction from './models/Interaction.js';
import authRoutes from './routes/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));



// Serve interactions
app.get('/api/welcome', async (req, res) => {
  res.status(200).json({ message: 'NCSA is top' });
});


// Auth API
app.use('/api/auth', authRoutes);

// Protect middleware
function protect(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ error: 'No token' });
  const token = header.split(' ')[1];
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}






// import path from 'path';
import { fileURLToPath } from 'url';
// import fs from 'fs';

// Emulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pub = fs.readFileSync(path.join(__dirname, 'keys', 'publicKey.asc'), 'utf8');


















// Load PGP keys
// const pub = fs.readFileSync(path.join(__dirname, 'keys', 'publicKey.asc'), 'utf8');
const priv = fs.readFileSync(path.join(__dirname, 'keys', 'privateKey.asc'), 'utf8');
const passphrase = 'mySecretPassphrase';

// Encrypt text
app.post('/pgp/encrypt-text', protect, async (req, res) => {
  const { text } = req.body;
  const publicKey = await openpgp.readKey({ armoredKey: pub });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ text }),
    encryptionKeys: publicKey
  });
  await Interaction.create({ user: req.user.id, type: 'encrypt-text', input: text, output: encrypted });
  res.json({ encrypted });
});

// // Decrypt text
// app.post('/pgp/decrypt-text', protect, async (req, res) => {
//   const { encryptedText } = req.body;
//   const privateKey = await openpgp.decryptKey({
//     privateKey: await openpgp.readPrivateKey({ armoredKey: priv }),
//     passphrase
//   });
//   const message = await openpgp.readMessage({ armoredMessage: encryptedText });
//   const { data: decrypted } = await openpgp.decrypt({ message, decryptionKeys: privateKey });
//   await Interaction.create({ user: req.user.id, type: 'decrypt-text', input: encryptedText, output: decrypted });
//   res.json({ decrypted });
// });




// from other server

app.post('/pgp/decrypt-text', protect, async (req, res) => {
  const { encryptedText } = req.body;
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: priv }),
    passphrase
  });
  const message = await openpgp.readMessage({ armoredMessage: encryptedText });
  const { data: decrypted } = await openpgp.decrypt({ message, decryptionKeys: privateKey });
  await Interaction.create({ user: req.user.id, type: 'decrypt-text', input: encryptedText, output: decrypted });
  res.json({ decrypted });
});
















// File upload
const upload = multer({ dest: 'uploads/' });

app.post('/pgp/encrypt-file', protect, upload.single('file'), async (req, res) => {
  const data = fs.readFileSync(req.file.path);
  const publicKey = await openpgp.readKey({ armoredKey: pub });
  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ binary: data }),
    encryptionKeys: publicKey
  });
  fs.unlinkSync(req.file.path);
  await Interaction.create({ user: req.user.id, type: 'encrypt-file', input: req.file.originalname, output: 'encrypted.pgp' });
  res.setHeader('Content-Disposition', 'attachment; filename="encrypted.pgp"');
  res.send(encrypted);
});

app.post('/pgp/decrypt-file', protect, upload.single('file'), async (req, res) => {
  const data = fs.readFileSync(req.file.path, 'utf8');
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: priv }),
    passphrase
  });
  const message = await openpgp.readMessage({ armoredMessage: data });
  const { data: decrypted } = await openpgp.decrypt({ message, decryptionKeys: privateKey });
  fs.unlinkSync(req.file.path);
  await Interaction.create({ user: req.user.id, type: 'decrypt-file', input: req.file.originalname, output: 'decrypted.txt' });
  res.setHeader('Content-Disposition', 'attachment; filename="decrypted.txt"');
  res.send(decrypted);
});

// Serve interactions
app.get('/api/interactions', protect, async (req, res) => {
  const ints = await Interaction.find().populate('user','username').sort('-timestamp');
  res.json(ints);
});



// Serve interactions
app.get('/', protect, async (req, res) => {
  res.status(200).json({ message: 'NCSA is top' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));