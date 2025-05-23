// pgp/file-encryption.js
import * as openpgp from 'openpgp';

export async function encryptFile(buffer, publicKeyArmored) {
  const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

  const encrypted = await openpgp.encrypt({
    message: await openpgp.createMessage({ binary: buffer }),
    encryptionKeys: publicKey,
    format: 'binary' // <-- this is important!
  });

  return encrypted; // this is a Uint8Array (binary)
}

