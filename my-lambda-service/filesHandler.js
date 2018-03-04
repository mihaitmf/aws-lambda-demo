'use strict';

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const s3BucketName = "lambdatrainingpayu";
const fileName = "the-great-file-of-cocos";

module.exports.writeFile = (event, context, callback) => {
  const fileContents = "nuts nuts nuts nuts\n" + new Date();

  const params = {
      Bucket: s3BucketName,
      Key: fileName,
      Body: fileContents,
      ACL: "public-read"
  };

  s3.putObject(params, function(err, data) {
      if (err) {
        console.log("An error occurred: " + err, err.stack);
      } else {
        console.log("Successfully wrote file \"" + fileName + "\" to the \"" + s3BucketName + "\" S3 bucket.");
      }
  });

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "The function to write a file to S3 has been invoked!",
      input: event,
    }),
  };

  callback(null, response);

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // callback(null, { message: 'Go Serverless v1.0! Your function executed successfully!', event });
};

module.exports.readFile = (event, context, callback) => {
    const params = {
        Bucket: s3BucketName,
        Key: fileName,
    };

    s3.getObject(params, function(err, data) {
        var responseError;
        var fileContent;
        if (err) {
            console.log("An error occurred: " + err, err.stack);

            responseError = err;
        } else {
            fileContent = data.Body.toString();
            console.log("Successfully retrieved file \"" + fileName + "\" from the \"" + s3BucketName + "\" S3 bucket.");
            console.log("File content:\n" + fileContent);
        }
        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: "The function to read a file from S3 has been invoked!",
                fileContent: fileContent,
                error: responseError,
                input: event,
            }),
        };

        // call "callback" here for synchronous response
        callback(null, response);
    });
};

module.exports.deleteFile = (event, context, callback) => {
    const params = {
        Bucket: s3BucketName,
        Key: fileName,
    };

    s3.deleteObject(params, function(err, data) {
        if (err) {
            console.log("An error occurred: " + err, err.stack);
        } else {
            console.log("Successfully removed file \"" + fileName + "\" from the \"" + s3BucketName + "\" S3 bucket.");
        }
    });

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: "The function to delete a file from S3 has been invoked!",
            input: event,
        }),
    };

    callback(null, response);
};

module.exports.connectDb = (event, context, callback) => {
    const mysql = require('mysql');

    const dbHost = process.env.dbHost;
    const dbPort = process.env.dbPort;

    const connection = mysql.createConnection({
        host     : dbHost,
        port     : dbPort,
        user     : 'mihait',
        password : 'test123#',
        database : 'mydatabase'
    });

    connection.connect();

    connection.query('SELECT CONCAT("Hello from the SQL ", NOW()) AS solution', function (error, results, fields) {
        if (error) {
            throw error;
        }

        console.log(results[0].solution);

        const response = {
            statusCode: 200,
            body: JSON.stringify({
                message: results[0].solution
            }),
        };

        // call "callback" here for synchronous response
        callback(null, response);
    });

    connection.end();
};
