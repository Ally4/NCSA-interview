// pgp/text-decryption.js
import * as openpgp from 'openpgp';

export async function decryptText(encryptedText, privateKeyArmored, passphrase) {
  const privateKey = await openpgp.decryptKey({
    privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
    passphrase
  });

  const message = await openpgp.readMessage({ armoredMessage: encryptedText });

  const { data: decrypted } = await openpgp.decrypt({
    message,
    decryptionKeys: privateKey
  });

  return decrypted;
}
