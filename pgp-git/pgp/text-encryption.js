// // pgp/text-encryption.js
// import * as openpgp from 'openpgp';

// export async function encryptText(text, publicKeyArmored) {
//   const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });

//   return await openpgp.encrypt({
//     message: await openpgp.createMessage({ text }),
//     encryptionKeys: publicKey
//   });
// }
