// pgp/file-decryption.js
import * as openpgp from 'openpgp';

export async function decryptFile(encryptedBuffer, privateKeyArmored, passphrase) {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });

  const message = await openpgp.readMessage({
    binaryMessage: encryptedBuffer // <- MUST stay binary
  });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey,
    format: 'binary' // <- must stay binary
  });

  return decrypted; // Uint8Array
}
