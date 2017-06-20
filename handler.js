'use strict';

module.exports.signup = (event, context, callback) => {
  var ret = null;
  var req = typeof event.body === 'string' ? JSON.parse(event.body) : event.body;
  var AmazonCognitoIdentity = require('amazon-cognito-identity-js');
  var userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.USER_POOL_CLIENT_ID
  });
  var userAttributeList = [
    {
      Name: 'email',
      Value: req.email
    }
  ];
  userPool.signUp(
    req.email,
    req.password,
    userAttributeList.map((e) => {
      return new AmazonCognitoIdentity.CognitoUserAttribute(e);
    }),
    null,
    (err, res) => {
      if (err) {
        ret = err;
      } else {
        ret = res;
      }
    }
  );
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'User creation returned successfully!  Check result to see what happened.',
      result: ret,
    }),
  };

  callback(null, response);
};
