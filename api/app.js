"use strict";
var log4js = require("log4js");
var logger = log4js.getLogger("Certifichain"); //
var express = require("express");
var bodyParser = require("body-parser");
var http = require("http");
var util = require("util");
var app = express();
// var expressJWT = require('express-jwt');
var { expressjwt: expressJWT } = require("express-jwt");
var jwt = require("jsonwebtoken");
var bearerToken = require("express-bearer-token");
var cors = require("cors");
const prometheus = require("prom-client");

require("./config.js");
var hfc = require("fabric-client");

var helper = require("./app/helper.js");
// var createChannel = require('./app/create-channel.js');
// var join = require('./app/join-channel.js');
// var install = require('./app/install-chaincode.js');
// var instantiate = require('./app/instantiate-chaincode.js');
var invoke = require("./app/invoke-transaction.js");
var query = require("./app/query.js");

var host = process.env.HOST || hfc.getConfigSetting("host");
var port = process.env.PORT || hfc.getConfigSetting("port");

app.options("*", cors());
app.use(cors());
//support parsing of application/json type post data
app.use(bodyParser.json());
//support parsing of application/x-www-form-urlencoded post data
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// set secret variable
app.set("secret", "thisismysecret");
app.use(
  expressJWT({
    secret: "thisismysecret",
    algorithms: ["HS256"],
  }).unless({
    path: ["/users", "/register", "/login", "/home"],
  })
);
app.use(bearerToken());

logger.level = 'debug';

app.use(function (req, res, next) {
  logger.debug(" ------>>>>>> new request for %s", req.originalUrl);
  if (
    	req.originalUrl.indexOf('/users') >= 0 || 
		  req.originalUrl.indexOf('/login') >= 0 || 
		  req.originalUrl.indexOf('/register') >= 0 ||
      req.originalUrl.indexOf('/home') >= 0
  ) {
    return next();
  }

  var token = req.token;
  jwt.verify(token, app.get("secret"), function (err, decoded) {
    if (err) {
      res.send({
        success: false,
        message:
          "Failed to authenticate token. Make sure to include the " +
          "token returned from /users call in the authorization header " +
          " as a Bearer token",
      });
      return;
    } else {
      // add the decoded user name and org name to the request object
      // for the downstream code to use
      req.username = decoded.username;
      req.orgname = decoded.orgName;
      logger.debug(
        util.format(
          "Decoded from JWT token: username - %s, orgname - %s",
          decoded.username,
          decoded.orgName
        )
      );
      return next();
    }
  });
});

///////////////////////////////////////////////////////////////////////////////
//////////////////////////////// START SERVER /////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
var server = http.createServer(app).listen(port, function () {});
logger.info("****************** SERVER STARTED ************************");
logger.info("***************  http://%s:%s  ******************", host, port);
server.timeout = 240000;

function getErrorMessage(field) {
  var response = {
    success: false,
    message: field + " field is missing or Invalid in the request",
  };
  return response;
}
///////////////////////////////////////////////////////////////////////////////
///////////////////////// REST ENDPOINTS START HERE ///////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Register and enroll user
app.post("/users", async function (req, res) {
  var username = req.body.username;
  var orgName = req.body.orgName;
  logger.debug("End point : /users");
  logger.debug("User name : " + username);
  logger.debug("Org name  : " + orgName);
  if (!username) {
    res.json(getErrorMessage('\'username\''));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage('\'orgName\''));
    return;
  }
  var token = jwt.sign(
    {
      exp:
        Math.floor(Date.now() / 1000) +
        parseInt(hfc.getConfigSetting("jwt_expiretime")) * 3, //1 jam expiert
      username: username,
      orgName: orgName,
    },
    app.get("secret")
  );
  let response = await helper.getRegisteredUser(username, orgName, true);
  logger.debug(
    "-- returned from registering the username %s for organization %s",
    username,
    orgName
  );
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully registered the username %s for organization %s",
      username,
      orgName
    );
    response.token = token;
    res.json(response);
  } else {
    logger.debug(
      "Failed to register the username %s for organization %s with::%s",
      username,
      orgName,
      response
    );
    res.json({ success: false, message: response });
  }
});

// Register and enroll user

app.post('/register', async function (req, res) {
  var username = req.body.username;
  var orgName = req.body.orgName;

  logger.debug("User name : " + username);
  logger.debug("Org name  : " + orgName);
  if (!username) {
    res.json(getErrorMessage('\'username\''));
    return;
  }
  if (!orgName) {
    res.json(getErrorMessage('\'orgName\''));
    return;
  }

  let response = await helper.getRegisteredUser(username, orgName, true);
  logger.debug(
    "-- returned from registering the username %s for organization %s",
    username,
    orgName
  );
  if (response && typeof response !== "string") {
    logger.debug(
      "Successfully registered the username %s for organization %s",
      username,
      orgName
    );

    res.json(response);
  } else {
    logger.debug(
      "Failed to register the username %s for organization %s with::%s",
      username,
      orgName,
      response
    );
    res.json({ success: false, message: response });
  }

});

// Login and get jwt
app.post('/login', async function (req, res) {
  var username = req.body.username;
  var orgName = req.body.orgName;

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

  var token = jwt.sign(
    {
      exp:
        Math.floor(Date.now() / 1000) +
        parseInt(hfc.getConfigSetting("jwt_expiretime")) * 3, //1 jam expiert
        username: username,
      orgName: orgName,
    },
    app.get("secret")
  );

  let isUserRegistered = await helper.isUserRegistered(username, orgName);
  
  if (isUserRegistered.success == true) {
      isUserRegistered.token = token;
  } 
  res.json(isUserRegistered);
});

// Invoke transaction on chaincode on target peers
async function _generateRandomID() {
  let prefix = "";
  let length = 10;
  // Generate a New ID
  let ID = prefix + Math.random().toString(36).substring(2, length);

  return ID.toString();
}

// CreateAsset
app.post(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== INVOKE ON CHAINCODE =================="
      );
      var peers = req.body.peers;
      var chaincodeName = req.params.chaincodeName;
      var channelName = req.params.channelName;
      var fcn = req.body.fcn;
      var args = req.body.args;
      // Generate a New ID  
      args[0] = await _generateRandomID();

      logger.debug("channelName  : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn  : " + fcn);
      logger.debug("args  : " + args);
      
      if (!chaincodeName) {
        res.json(getErrorMessage("'chaincodeName'"));
        return;
      }
      if (!channelName) {
        res.json(getErrorMessage("'channelName'"));
        return;
      }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (!args) {
        res.json(getErrorMessage("'args'"));
        return;
      }

      const start = Date.now();
      let message = await invoke.invokeChaincode(
        peers,
        channelName,
        chaincodeName,
        fcn,
        args,
        req.username,
        req.orgname
      );
      const latency = Date.now() - start;

      const response_payload = {
        result: message,
        error: null,
        errorData: null,
      };
      res.send(response_payload);
    } catch (error) {
      const response_payload = {
        result: null,
        error: error.name,
        errorData: error.message,
      };
      res.send(response_payload);
    }
  }
);
// Update Asset
app.put(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== INVOKE ON CHAINCODE =================="
      );
      var peers = req.body.peers;
      var chaincodeName = req.params.chaincodeName;
      var channelName = req.params.channelName;
      var fcn = "UpdateAsset";
      var args = req.body.args;
      // // Generate a New ID  
      // args[0] = await _generateRandomID();

      logger.debug("channelName  : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn  : " + fcn);
      logger.debug("args  : " + args);
      if (!chaincodeName) {
        res.json(getErrorMessage("'chaincodeName'"));
        return;
      }
      if (!channelName) {
        res.json(getErrorMessage("'channelName'"));
        return;
      }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (!args) {
        res.json(getErrorMessage("'args'"));
        return;
      }

      const start = Date.now();
      let message = await invoke.invokeChaincode(
        peers,
        channelName,
        chaincodeName,
        fcn,
        args,
        req.username,
        req.orgname
      );
      const latency = Date.now() - start;

      const response_payload = {
        result: message,
        error: null,
        errorData: null,
      };
      res.send(response_payload); //response success
      console.log("Data telah terupdate");
    } catch (error) {
      const response_payload = {
        result: null,
        error: error.name,
        errorData: error.message,
      };
      res.send(response_payload); //response failed
    }
  }
);

// Delete Asset
app.delete(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    try {
      logger.debug(
        "==================== INVOKE ON CHAINCODE =================="
      );
      var peers = req.body.peers;
      var chaincodeName = req.params.chaincodeName;
      var channelName = req.params.channelName;
      var fcn = "DeleteAsset";
      var args = req.body.args;
      logger.debug("channelName  : " + channelName);
      logger.debug("chaincodeName : " + chaincodeName);
      logger.debug("fcn  : " + fcn);
      logger.debug("args  : " + args);
      if (!chaincodeName) {
        res.json(getErrorMessage("'chaincodeName'"));
        return;
      }
      if (!channelName) {
        res.json(getErrorMessage("'channelName'"));
        return;
      }
      if (!fcn) {
        res.json(getErrorMessage("'fcn'"));
        return;
      }
      if (!args) {
        res.json(getErrorMessage("'args'"));
        return;
      }

      const start = Date.now();
      let message = await invoke.invokeChaincode(
        peers,
        channelName,
        chaincodeName,
        fcn,
        args,
        req.username,
        req.orgname
      );
      const latency = Date.now() - start;

      const response_payload = {
        result: message,
        error: null,
        errorData: null,
      };
      res.send(response_payload); //response success
      console.log("Data telah terhapus");
    } catch (error) {
      const response_payload = {
        result: null,
        error: error.name,
        errorData: error.message,
      };
      res.send(response_payload); //response failed
    }
  }
);

// Query on chaincode on target peers
// ReadAsset for user
app.get("/home", async function (req, res) {
  logger.debug("==================== QUERY BY CHAINCODE ==================");
  // var channelName = req.params.channelName; //"mychannel"
  // var chaincodeName = req.params.chaincodeName; //"basic"
  var channelName = "mychannel";
  var chaincodeName = "basic";
  let args = req.query.args;
  let fcn = req.query.fcn;
  let peer = req.query.peer;

  logger.debug("channelName : " + channelName);
  logger.debug("chaincodeName : " + chaincodeName);
  logger.debug("fcn : " + fcn);
  logger.debug("args : " + args);

  if (!chaincodeName) {
    res.json(getErrorMessage("'chaincodeName'"));
    return;
  }
  if (!channelName) {
    res.json(getErrorMessage("'channelName'"));
    return;
  }
  if (!fcn) {
    res.json(getErrorMessage("'fcn'"));
    return;
  }
  if (!args) {
    res.json(getErrorMessage("'args'"));
    return;
  }
  args = args.replace(/'/g, '"');
  args = JSON.parse(args);
  logger.debug(args);

  let message = await query.readChaicode(
    peer,
    channelName,
    chaincodeName,
    args,
    fcn,
  );
  res.send(message);
});

// Query on chaincode on target peers
app.get('/dashboard', async function (req, res) {
	logger.debug('==================== QUERY BY CHAINCODE ==================');
	var channelName = "mychannel";
  var chaincodeName = "basic";
	let args = req.query.args;
	let fcn = req.query.fcn;
	let peer = req.query.peer;

	logger.debug('channelName : ' + channelName);
	logger.debug('chaincodeName : ' + chaincodeName);
	logger.debug('fcn : ' + fcn);
	logger.debug('args : ' + args);

	if (!chaincodeName) {
		res.json(getErrorMessage('\'chaincodeName\''));
		return;
	}
	if (!channelName) {
		res.json(getErrorMessage('\'channelName\''));
		return;
	}
	if (!fcn) {
		res.json(getErrorMessage('\'fcn\''));
		return;
	}
	if (!args) {
		res.json(getErrorMessage('\'args\''));
		return;
	}
	args = args.replace(/'/g, '"');
	args = JSON.parse(args);
	logger.debug(args);

	let message = await query.queryChaincode(peer, channelName, chaincodeName, args, fcn, req.username, req.orgname);
	res.send(message);
});

// Query Get Transaction by Transaction ID
app.get(
  "/channels/:channelName/transactions/:trxnId",
  async function (req, res) {
    logger.debug(
      "================ GET TRANSACTION BY TRANSACTION_ID ======================"
    );
    logger.debug("channelName : " + req.params.channelName);
    let trxnId = req.params.trxnId;
    let peer = req.query.peer;
    if (!trxnId) {
      res.json(getErrorMessage("'trxnId'"));
      return;
    }

    let message = await query.getTransactionByID(
      peer,
      req.params.channelName,
      trxnId,
      req.username,
      req.orgname
    );
    res.send(message);
  }
);

// History on chaincode on target peers
app.get(
  "/channels/:channelName/chaincodes/:chaincodeName",
  async function (req, res) {
    logger.debug("==================== QUERY BY CHAINCODE ==================");
    var channelName = req.params.channelName;
    var chaincodeName = req.params.chaincodeName;
    let args = req.query.args;
    let fcn = req.query.fcn;
    let peer = req.query.peer;

    logger.debug("channelName : " + channelName);
    logger.debug("chaincodeName : " + chaincodeName);
    logger.debug("fcn : " + fcn);
    logger.debug("args : " + args);

    if (!chaincodeName) {
      res.json(getErrorMessage("'chaincodeName'"));
      return;
    }
    if (!channelName) {
      res.json(getErrorMessage("'channelName'"));
      return;
    }
    if (!fcn) {
      res.json(getErrorMessage("'fcn'"));
      return;
    }
    if (!args) {
      res.json(getErrorMessage("'args'"));
      return;
    }
    args = args.replace(/'/g, '"');
    args = JSON.parse(args);
    logger.debug(args);

    let message = await query.queryChaincode(
      peer,
      channelName,
      chaincodeName,
      args,
      fcn,
      req.username,
      req.orgname
    );
    res.send(message);
  }
);

module.exports = app;
