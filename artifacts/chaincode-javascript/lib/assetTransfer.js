/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

// Deterministic JSON.stringify()
const stringify = require("json-stringify-deterministic");
const sortKeysRecursive = require("sort-keys-recursive");
const { Contract } = require("fabric-contract-api");

class AssetTransfer extends Contract {
  async InitLedger(ctx) {
    const assets = [
      {
        ID: "asset1",
        Color: "blue",
        Size: 5,
        Owner: "Tomoko",
        AppraisedValue: 300,
      },
      {
        ID: "asset2",
        Color: "red",
        Size: 5,
        Owner: "Brad",
        AppraisedValue: 400,
      },
      {
        ID: "asset3",
        Color: "green",
        Size: 10,
        Owner: "Jin Soo",
        AppraisedValue: 500,
      },
      {
        ID: "asset4",
        Color: "yellow",
        Size: 10,
        Owner: "Max",
        AppraisedValue: 600,
      },
      {
        ID: "asset5",
        Color: "black",
        Size: 15,
        Owner: "Adriana",
        AppraisedValue: 700,
      },
      {
        ID: "asset6",
        Color: "white",
        Size: 15,
        Owner: "Michel",
        AppraisedValue: 800,
      },
    ];

    for (const asset of assets) {
      await this.CreateAsset(
        ctx,
        asset.ID,
        asset.Color,
        asset.Size,
        asset.Owner,
        asset.AppraisedValue
      );
      // asset.docType = 'asset';

      // example of how to write to world state deterministically
      // use convetion of alphabetic order
      // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
      // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash

      // await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
    }
  }

  // CreateAsset issues a new asset to the world state with given details.
  async CreateAsset(ctx, id, color, size, owner, appraisedValue) {
    const exists = await this.AssetExists(ctx, id);
    if (exists) {
      throw new Error(`The asset ${id} already exists`);
    }

    const asset = {
      docType: "asset",
      ID: id,
      Color: color,
      Size: parseInt(size),
      Owner: owner,
      AppraisedValue: parseInt(appraisedValue),
    };
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(asset)))
    );

    let indexName = "color~name";
    let colorNameIndexKey = await ctx.stub.createCompositeKey(indexName, [
      asset.Color,
      asset.ID,
    ]);

    //  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
    //  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
    await ctx.stub.putState(colorNameIndexKey, Buffer.from("\u0000"));
    // await ctx.stub.putState(colorNameIndexKey, Buffer.from(stringify(sortKeysRecursive(asset))));
    return JSON.stringify(asset);
  }

  // ReadAsset returns the asset stored in the world state with given id.
  async ReadAsset(ctx, id) {
    const assetJSON = await ctx.stub.getState(id); // get the asset from chaincode state
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`The asset ${id} does not exist`);
    }
    return assetJSON.toString();
  }

  // UpdateAsset updates an existing asset in the world state with provided parameters.
  async UpdateAsset(ctx, id, color, size, owner, appraisedValue) {
    const exists = await this.AssetExists(ctx, id);
    if (!exists) {
      throw new Error(`The asset ${id} does not exist`);
    }

    let valAsbytes = await ctx.stub.getState(id); // get the asset from chaincode state
    let jsonResp = {};
    let oldAssetJSON;
    try {
      oldAssetJSON = JSON.parse(valAsbytes.toString());
    } catch (err) {
      jsonResp = {};
      jsonResp.error = `Failed to decode JSON of: ${id}`;
      throw new Error(jsonResp);
    }

    // overwriting original asset with new asset
    const updatedAsset = {
      docType: "asset",
      ID: id,
      Color: color,
      Size: size,
      Owner: owner,
      AppraisedValue: appraisedValue,
    };
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(updatedAsset)))
    );

    // Delete Old Composite
    let indexName = "color~name";
    let colorNameIndexKey = await ctx.stub.createCompositeKey(indexName, [
      oldAssetJSON.Color,
      oldAssetJSON.ID,
    ]);
    if (!colorNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }
    //  Delete index entry to state.
    await ctx.stub.deleteState(colorNameIndexKey);

    // Update Composite
    colorNameIndexKey = await ctx.stub.createCompositeKey(indexName, [
      updatedAsset.Color,
      updatedAsset.ID,
    ]);
    await ctx.stub.putState(colorNameIndexKey, Buffer.from("\u0000"));
    // await ctx.stub.putState(colorNameIndexKey, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    return JSON.stringify(updatedAsset);
  }

  // DeleteAsset deletes an given asset from the world state.
  async DeleteAsset(ctx, id) {
    const exists = await this.AssetExists(ctx, id);
    if (!exists) {
      throw new Error(`The asset ${id} does not exist`);
    }

    let valAsbytes = await ctx.stub.getState(id); // get the asset from chaincode state
    let jsonResp = {};
    if (!valAsbytes) {
      jsonResp.error = `Asset does not exist: ${id}`;
      throw new Error(jsonResp);
    }
    let assetJSON;
    try {
      assetJSON = JSON.parse(valAsbytes.toString());
    } catch (err) {
      jsonResp = {};
      jsonResp.error = `Failed to decode JSON of: ${id}`;
      throw new Error(jsonResp);
    }
    // delete the index
    let indexName = "color~name";
    let colorNameIndexKey = ctx.stub.createCompositeKey(indexName, [
      assetJSON.color,
      assetJSON.assetID,
    ]);
    if (!colorNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }
    //  Delete index entry to state.
    await ctx.stub.deleteState(colorNameIndexKey);

    return ctx.stub.deleteState(id);
  }

  // AssetExists returns true when asset with given ID exists in world state.
  async AssetExists(ctx, id) {
    const assetJSON = await ctx.stub.getState(id);
    return assetJSON && assetJSON.length > 0;
  }

  // TransferAsset updates the owner field of asset with given id in the world state.
  async TransferAsset(ctx, id, newOwner) {
    const assetString = await this.ReadAsset(ctx, id);
    const asset = JSON.parse(assetString);
    const oldOwner = asset.Owner;
    asset.Owner = newOwner;
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(asset)))
    );
    return oldOwner;
  }

  // GetAllAssets returns all assets found in the world state.
  async GetAllAssets(ctx) {
    const allResults = [];
    // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
    const iterator = await ctx.stub.getStateByRange("", "");
    let result = await iterator.next();
    while (!result.done) {
      const strValue = Buffer.from(result.value.value.toString()).toString(
        "utf8"
      );
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      result = await iterator.next();
    }
    return JSON.stringify(allResults);
  }

  // GetAssetHistory returns the chain of custody for an asset since issuance.
  async GetAssetHistory(ctx, assetName) {
    let resultsIterator = await ctx.stub.getHistoryForKey(assetName);
    let results = await this._GetAllResults(resultsIterator, true);

    return JSON.stringify(results);
  }
  // Get Asset By Color
  async AssetByColor(ctx, color) {
    const allResults = [];

    let coloredAssetResultsIterator =
      await ctx.stub.getStateByPartialCompositeKey("color~name", [color]);

    // Iterate through result set and for each asset found, transfer to newOwner
    let responseRange = await coloredAssetResultsIterator.next();
    while (!responseRange.done) {
      if (!responseRange || !responseRange.value || !responseRange.value.key) {
        return;
      }
      let objectType;
      let attributes;
      ({ objectType, attributes } = await ctx.stub.splitCompositeKey(
        responseRange.value.key
      ));

      console.log(objectType);
      let id = attributes[1];
      let assetAsBytes = await ctx.stub.getState(id);

      const strValue = Buffer.from(assetAsBytes.toString());
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      responseRange = await coloredAssetResultsIterator.next();
    }
    return JSON.stringify(allResults);
  }

  async _GetAllResults(iterator, isHistory) {
    let allResults = [];
    let res = await iterator.next();
    while (!res.done) {
      if (res.value && res.value.value.toString()) {
        let jsonRes = {};
        console.log(res.value.value.toString("utf8"));
        if (isHistory && isHistory === true) {
          jsonRes.TxId = res.value.txId;
          jsonRes.Timestamp = res.value.timestamp;
          try {
            jsonRes.Value = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Value = res.value.value.toString("utf8");
          }
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString("utf8");
          }
        }
        allResults.push(jsonRes);
      }
      res = await iterator.next();
    }
    iterator.close();
    return allResults;
  }
}

module.exports = AssetTransfer;
