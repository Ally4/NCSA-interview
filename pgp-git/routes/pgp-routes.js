// routes/pgp-routes.js
import express from 'express';
import multer from 'multer';
import { encryptText } from '../pgp/text-encryption.js';
import { encryptFile } from '../pgp/file-encryption.js';
import { decryptText } from '../pgp/text-decryption.js';
import { decryptFile } from '../pgp/file-decryption.js';
import { generateKeys } from '../pgp/keys.js';

const router = express.Router();
const upload = multer();

const passphrase = '1234';
const name = 'ally';
const email = 'el.ally741@gmail.com';
let publicKey, privateKey;

(async () => {
  const keys = await generateKeys(name, email, passphrase);
  publicKey = keys.publicKey;
  privateKey = keys.privateKey;
})();

// === Encrypt Text ===
router.post('/encrypt-text', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required.' });

    const encrypted = await encryptText(text, publicKey);
    res.json({ encrypted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// === Decrypt Text ===
router.post('/decrypt-text', async (req, res) => {
  try {
    const { encryptedText } = req.body;
    if (!encryptedText) return res.status(400).json({ error: 'Encrypted text is required.' });

    const decrypted = await decryptText(encryptedText, privateKey, passphrase);
    res.json({ decrypted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post('/encrypt-file', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'File is required.' });
  
      const encrypted = await encryptFile(req.file.buffer, publicKey);
      
      res.set('Content-Type', 'application/octet-stream');
      res.set('Content-Disposition', 'attachment; filename="encrypted.pgp"');
      res.send(Buffer.from(encrypted)); // <- this must be a Buffer
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  







router.post('/decrypt-file', upload.single('file'), async (req, res) => {
    try {
      if (!req.file) return res.status(400).json({ error: 'Encrypted file is required.' });
  
      const decrypted = await decryptFile(req.file.buffer, privateKey, passphrase);
  
      res.set('Content-Type', 'application/octet-stream');
      res.set('Content-Disposition', 'attachment; filename="decrypted.txt"');
      res.send(Buffer.from(decrypted)); // <- critical: binary buffer
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  











export default router;
