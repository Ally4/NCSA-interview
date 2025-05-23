// pgp/keys.js
import * as openpgp from 'openpgp';

export async function generateKeys(name, email, passphrase) {
  const { privateKey, publicKey } = await openpgp.generateKey({
    type: 'rsa',
    rsaBits: 2048,
    userIDs: [{ name, email }],
    passphrase
  });

  return { privateKey, publicKey };
}