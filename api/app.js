'use strict';
var log4js = require('log4js');
var logger = log4js.getLogger("SampleWebApp");
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var util = require('util');
var app = express();
// var expressJWT = require('express-jwt');
var { expressjwt: expressJWT } = require("express-jwt");
var jwt = require('jsonwebtoken');
var bearerToken = require('express-bearer-token');
var cors = require('cors');
const prometheus = require('prom-client')

require('./config.js');
var hfc = require('fabric-client');

var helper = require('./app/helper.js');
// var createChannel = require('./app/create-channel.js');
// var join = require('./app/join-channel.js');
// var install = require('./app/install-chaincode.js');
// var instantiate = require('./app/instantiate-chaincode.js');
// var invoke = require('./app/invoke-transaction.js');
// var query = require('./app/query.js');
var host = process.env.HOST || hfc.getConfigSetting('host');
var port = process.env.PORT || hfc.getConfigSetting('port');

app.options('*', cors());
app.use(cors());
//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
	extended: false
}));
// set secret variable
app.set('secret', 'thisismysecret');
app.use(expressJWT({
	secret: 'thisismysecret',
    algorithms: ["HS256"]
}).unless({
	path: ['/users', '/metrics']
}));
app.use(bearerToken());
app.use(function (req, res, next) {
	logger.debug(' ------>>>>>> new request for %s', req.originalUrl);
	if (req.originalUrl.indexOf('/users') >= 0 || req.originalUrl.indexOf('/metrics') >= 0) {
		return next();
	}

	var token = req.token;
	jwt.verify(token, app.get('secret'), function (err, decoded) {
		if (err) {
			res.send({
				success: false,
				message: 'Failed to authenticate token. Make sure to include the ' +
					'token returned from /users call in the authorization header ' +
					' as a Bearer token'
			});
			return;
		} else {
			// add the decoded user name and org name to the request object
			// for the downstream code to use
			req.username = decoded.username;
			req.orgname = decoded.orgName;
			logger.debug(util.format('Decoded from JWT token: username - %s, orgname - %s', decoded.username, decoded.orgName));
			return next();
		}
	});
});

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START SERVER /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var server = http.createServer(app).listen(port, function () { });
logger.info('****************** SERVER STARTED ************************');
logger.info('***************  http://%s:%s  ******************', host, port);
server.timeout = 240000;

function getErrorMessage(field) {
	var response = {
		success: false,
		message: field + ' field is missing or Invalid in the request'
	};
	return response;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////// REST ENDPOINTS START HERE ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Register and enroll user
app.post('/users', async function (req, res) {
	var username = req.body.username;
	var orgName = req.body.orgName;
	logger.debug('End point : /users');
	logger.debug('User name : ' + username);
	logger.debug('Org name  : ' + orgName);
	if (!username) {
		res.json(getErrorMessage('\'username\''));
		return;
	}
	if (!orgName) {
		res.json(getErrorMessage('\'orgName\''));
		return;
	}
	var token = jwt.sign({
		exp: Math.floor(Date.now() / 1000) + parseInt(hfc.getConfigSetting('jwt_expiretime')),
		username: username,
		orgName: orgName
	}, app.get('secret'));
	let response = await helper.getRegisteredUser(username, orgName, true);
	logger.debug('-- returned from registering the username %s for organization %s', username, orgName);
	if (response && typeof response !== 'string') {
		logger.debug('Successfully registered the username %s for organization %s', username, orgName);
		response.token = token;
		res.json(response);
	} else {
		logger.debug('Failed to register the username %s for organization %s with::%s', username, orgName, response);
		res.json({ success: false, message: response });
	}

});