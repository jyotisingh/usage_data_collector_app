const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');

const PRIVATE_KEY_FILE_PATH = path.resolve('resources/private_key.pem');

const readPrivateKey = function() {
	return fs.readFileSync(PRIVATE_KEY_FILE_PATH, 'utf8');
}

module.exports = function (textToDecrypt) {
	const PRIVATE_KEY = new NodeRSA(readPrivateKey());
	console.log(PRIVATE_KEY.encrypt(textToDecrypt));
	
	// const text = 'Hello RSA!';
	// const encrypted = key.encrypt(text, 'base64');
	// console.log('encrypted: ', encrypted);
	// const decrypted = key.decrypt(encrypted, 'utf8');
	// console.log('decrypted: ', decrypted);
	// body...
};