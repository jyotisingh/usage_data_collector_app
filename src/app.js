const axios = require('axios')
const AWS = require('aws-sdk')
const decrypt = require('./lib/decrypt');
const url = 'http://checkip.amazonaws.com/';
const {Client} = require('pg')


let response;

const getParam = function (paramName, outputs) {
    for (index in outputs) {
        if (outputs[index].OutputKey === paramName)
            return outputs[index].OutputValue;
    }
}

exports.lambda_handler = async (event, context, callback) => {
    try {
        decrypt("foobar");
        // var cloudformation = new AWS.CloudFormation();
        var params = {
            StackName: 'usage-data-collector-app'
        };

        const connectionString = "postgresql://root:root1234@foobar.us-east-1.rds.amazonaws.com:5432/usagedata"
        const config = {
            connectionString: connectionString
        }
        const client = new Client(config)
        await client.connect();
        client.query('select * from information_schema.tables', (err, res) => {
            console.log(err ? err.stack : res.rows) // Hello World!
            client.end();
        });

        const ret = await axios(url);
        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                message: 'hello world',
                location: ret.data.trim()
            })
        }



        // cloudformation.describeStacks(params, async function (err, data) {
        //         if (err) console.log(err, err.stack); // an error occurred
        //         else {
        //             // console.log(data.Stacks[0].Outputs);
        //             try {
        //                 const connectionString = getParam('UsageDataPostgresDBConnectionString', data.Stacks[0].Outputs);
        //                 console.log("connectionString")
        //                 console.log(connectionString)
        //                 const config = {
        //                     connectionString: connectionString
        //                 }
        //                 const client = new Client(config)
        //                 await client.connect();
        //                 client.query('select * from information_schema.tables', (err, res) => {
        //                     console.log(err ? err.stack : res.rows) // Hello World!
        //                     client.end();
        //                 });
        //
        //                 const ret = await axios(url);
        //                 response = {
        //                     'statusCode': 200,
        //                     'body': JSON.stringify({
        //                         message: 'hello world',
        //                         location: ret.data.trim()
        //                     })
        //                 }
        //
        //             } catch (e) {
        //                 console.log(e);
        //             }
        //         }           // successful response
        //     }
        // );



    }
    catch
        (err) {
        console.log(err);
        callback(err, null);
    }

    callback(null, response)
}
;
