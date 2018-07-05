const axios = require('axios')
const decrypt = require('./lib/decrypt');
const url = 'http://checkip.amazonaws.com/';
let response;

decrypt("foobar");

exports.lambda_handler = async (event, context, callback) => {
    try {
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
