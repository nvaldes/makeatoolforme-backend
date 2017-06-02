'use strict';

module.exports.signup = (event, context, callback) => {
  var ret = null;
  var req = JSON.parse(event.body);
  var AWS = require('aws-sdk');
  var userPool = new AWS.CognitoIdentityServiceProvider.CognitoUserPool({
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.USER_POOL_CLIENT_ID
  });
  userPool.signUp(req.email, req.password, [
    {
      Name: 'email',
      Value: req.email
    },
    {
      Name: 'given_name',
      Value: req.given_name
    },
    {
      Name: 'family_name',
      Value: req.family_name
    }
  ], (err, res) => {
    if (err) {
      ret = err;
    } else {
      ret = res;
    }
  });
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User creation returned successfully!  Check result to see what happened.',
      result: ret,
    }),
  };

  callback(null, response);
};
