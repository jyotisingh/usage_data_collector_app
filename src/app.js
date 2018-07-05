const axios = require('axios')
const url = 'http://checkip.amazonaws.com/';
const NodeRSA = require('node-rsa');
let response;


exports.lambda_handler = async (event, context, callback) => {
    try {
const key = new NodeRSA({b: 512});
 
const text = 'Hello RSA!';
const encrypted = key.encrypt(text, 'base64');
console.log('encrypted: ', encrypted);
const decrypted = key.decrypt(encrypted, 'utf8');
console.log('decrypted: ', decrypted);

        const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                location: ret.data.trim()
            })
        }
    }
    catch (err) {
        console.log(err);
        callback(err, null);
    }

    callback(null, response)
};
