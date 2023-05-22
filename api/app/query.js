/**
 * Copyright 2017 IBM All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */
var util = require("util");
var helper = require("./helper.js");
var logger = helper.getLogger("Query");

var queryChaincode = async function (
  peer,
  channelName,
  chaincodeName,
  args,
  fcn,
  username,
  org_name
) {
  try {
    // first setup the client for this org
    var client = await helper.getClientForOrg(org_name, username);
    logger.debug(
      'Successfully got the fabric client for the organization "%s"',
      org_name
    );
    var channel = client.getChannel(channelName);
    if (!channel) {
      let message = util.format(
        "Channel %s was not defined in the connection profile",
        channelName
      );
      logger.error(message);
      throw new Error(message);
    }

    // send query
    var request = {
      targets: [peer], //queryByChaincode allows for multiple targets
      chaincodeId: chaincodeName,
      fcn: fcn,
      args: args,
    };
    let response_payloads = await channel.queryByChaincode(request);

    if (response_payloads[0].status == 500) {
      return {
        status: 500,
        error: response_payloads[0].toString("utf8"),
        successs: false,
      };
    }

    console.log(response_payloads[0].toString("utf8"));

    if (response_payloads != "") {
      for (let i = 0; i < response_payloads.length; i++) {
        logger.info(
          "Batch",
          args[0] + "=" + response_payloads[i].toString("utf8")
        );
      }
      // return a JSON Object as response
      return JSON.parse(response_payloads.toString("utf8"));
    } else {
      logger.error("response_payloads is null");
      throw new Error("response_payload is null");
    }
  } catch (error) {
    logger.error(
      "Failed to query due to error: " + error.stack ? error.stack : error
    );
    throw new Error(`${error.message}`);
  }
};

var readChaicode = async function (
  peer,
  channelName,
  chaincodeName,
  args,
  fcn,
) {
  try {
    // first setup the client for this org
    var org_name = 'Org2';
    var username = 'public_user';

    try {
      var client = await helper.getClientForOrg(org_name, username);
    } catch (err) {
      try {
        await helper.getRegisteredUser(username, org_name, true);
        client = await helper.getClientForOrg(org_name, username);
      } catch (error) {
        console.error('Error getting client:', error);
        throw new Error('Failed to get client');
      }
    }

    
    logger.info("APAKAH ERROR ?",client);
    
    logger.debug(
      'Successfully got the fabric client for the organization "%s"',
      org_name
    );
    var channel = client.getChannel(channelName);
    

    if (!channel) {
      let message = util.format(
        "Channel %s was not defined in the connection profile",
        channelName
      );
      logger.error(message);
      throw new Error(message);
    }

    // send query
    var request = {
      targets: [peer], //queryByChaincode allows for multiple targets
      chaincodeId: chaincodeName,
      fcn: fcn,
      args: args,
    };
    let response_payloads = await channel.queryByChaincode(request);

    if (response_payloads[0].status == 500) {
      return {
        status: 500,
        error: response_payloads[0].toString("utf8"),
        successs: false,
      };
    }

    console.log(response_payloads[0].toString("utf8"));

    if (response_payloads != "") {
      for (let i = 0; i < response_payloads.length; i++) {
        logger.info(
          "Batch",
          args[0] + "=" + response_payloads[i].toString("utf8")
        );
      }
      // return a JSON Object as response
      return JSON.parse(response_payloads.toString("utf8"));
    } else {
      logger.error("response_payloads is null");
      throw new Error("response_payload is null");
    }
  } catch (error) {
    logger.error(
      "Failed to query due to error: " + error.stack ? error.stack : error
    );
    throw new Error(`${error.message}`);
  }
};


var getTransactionByID = async function (
  peer,
  channelName,
  trxnID,
  username,
  org_name
) {
  try {
    // first setup the client for this org
    var client = await helper.getClientForOrg(org_name, username);
    logger.debug(
      'Successfully got the fabric client for the organization "%s"',
      org_name
    );
    var channel = client.getChannel(channelName);
    if (!channel) {
      let message = util.format(
        "Channel %s was not defined in the connection profile",
        channelName
      );
      logger.error(message);
      throw new Error(message);
    }

    let response_payload = await channel.queryTransaction(trxnID, peer);
    if (response_payload) {
      logger.debug(response_payload);
      return response_payload;
    } else {
      logger.error("response_payload is null");
      return "response_payload is null";
    }
  } catch (error) {
    logger.error(
      "Failed to query due to error: " + error.stack ? error.stack : error
    );
    return error.toString();
  }
};


exports.queryChaincode = queryChaincode;
exports.readChaicode = readChaicode;
exports.getTransactionByID = getTransactionByID;
