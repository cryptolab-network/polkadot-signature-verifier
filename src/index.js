const { cryptoWaitReady } = require('@polkadot/util-crypto');
const { decodeAddress, signatureVerify } = require('@polkadot/util-crypto');
const { u8aToHex, u8aWrapBytes } = require('@polkadot/util');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv)).option('signature', {
  string: true
}).argv;

const msg = argv.msg;
const signature = argv.signature;
const address = argv.address;
const isValidSignature = async (signedMessage, signature, address) => {
  await cryptoWaitReady();
  const publicKey = decodeAddress(address);
  const hexPublicKey = u8aToHex(publicKey);
  return signatureVerify(u8aWrapBytes(signedMessage), signature, hexPublicKey).isValid;
};

const isValid = isValidSignature(
  msg,
  signature,
  address
).then((result) => {
  console.log(result);
}).catch((err) => {
  console.error(err);
});
