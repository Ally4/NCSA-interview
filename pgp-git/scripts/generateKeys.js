import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Output folder
const keysDir = path.join(__dirname, '../keys');

// Create folder if it doesn't exist
if (!fs.existsSync(keysDir)) {
  fs.mkdirSync(keysDir, { recursive: true });
}

// Your info
const name = 'Your Name';
const email = 'your@example.com';
const passphrase = 'mySecretPassphrase';

const run = async () => {
  const { publicKey, privateKey } = await generateKeys(name, email, passphrase);

  fs.writeFileSync(path.join(keysDir, 'publicKey.asc'), publicKey, 'utf8');
  fs.writeFileSync(path.join(keysDir, 'privateKey.asc'), privateKey, 'utf8');

  console.log('PGP keys generated and saved to /keys');
};

run();
