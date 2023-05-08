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

// const { all } = require("../../../api/app");

class AssetTransfer extends Contract {
  // // Generate random ID
  async _generateRandomID(ctx) {
    let prefix = "";
    let length = 10;
    // Generate a New ID
    let ID = prefix + Math.random().toString(36).substring(2, length);

    // Check if the ID already exist on the ledger
    let assetExists = await ctx.stub.getState(ID);
    if (assetExists && assetExists > 0) {
      ID = await _generateRandomID(ctx);
    }

    return ID.toString();
  }

  async InitLedger(ctx) {
    // let idCert = await this._generateRandomID(ctx);
    const assets = [
      {
        ID: "random123",
        Acara: "ACARA 1",
        Organisasi: "Organisasi_Keamanan",
        Nama: "Test 1",
        Perihal: "Workshop",
        Deskripsi: "asdnqwienzliqlksdlamcpawenqlwe (contoh)",
        TTD1: "eqwkvspdad== (base64)",
        TTD2: "qsdaserzxc== (base64)",
        Certificate: "asdqwvjaskaa== (base64)",
      },
    ];

    for (const asset of assets) {
      await this.CreateAsset(
        ctx,
        asset.ID,
        asset.Acara,
        asset.Organisasi,
        asset.Nama,
        asset.Perihal,
        asset.Deskripsi,
        asset.TTD1,
        asset.TTD2,
        asset.Certificate
      );
    }
  }

  // CreateAsset issues a new asset to the world state with given details.
  async CreateAsset(
    ctx,
    idCert,
    acara,
    oraganisasi,
    nama,
    perihal,
    deskripsi,
    ttd1,
    ttd2,
    certificate
  ) {
    if (idCert == "" && idCert != "random123") {
      // // idCert = await this._generateRandomID(ctx);
      // let prefix = "";
      // let length = 10;
      // // Generate a New ID
      // idCert = prefix + Math.random().toString(36).substring(2, length);
      // idCert = encode(index + prefix + "12")
      // idCert = angkaPil + decode(encode(idCert)) + angkaPil2
      // throw new Error(`idCert = ${idCert}`);
      // idCert = "random111";
      // Check if the ID already exist on the ledger
      const exists = await this.AssetExists(ctx, idCert);
      if (exists) {
        throw new Error(`The asset ${idCert} already exists`);
      }
    } else {
      const exists = await this.AssetExists(ctx, idCert);
      if (exists) {
        throw new Error(`The asset ${idCert} already exists`);
      }
    }
    let id = idCert;
    const asset = {
      docType: "certificate",
      ID: id,
      Acara: acara,
      Organisasi: oraganisasi,
      Nama: nama,
      Perihal: perihal,
      Deskripsi: deskripsi,
      TTD1: ttd1,
      TTD2: ttd2,
      Certificate: certificate,
    };
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      id,
      Buffer.from(stringify(sortKeysRecursive(asset)))
    );
    // Komposite Organisasi
    let indexName = "Organisasi~";
    let organisasiNameIndexKey = await ctx.stub.createCompositeKey(indexName, [
      asset.Organisasi,
      asset.ID,
    ]);

    //  Save index entry to state. Only the key name is needed, no need to store a duplicate copy of the marble.
    //  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
    await ctx.stub.putState(organisasiNameIndexKey, Buffer.from("\u0000"));

    //Komposite Acara
    indexName = `${asset.Organisasi}~Acara`;
    let acaraNameIndexKey = await ctx.stub.createCompositeKey(indexName, [
      asset.Acara,
      asset.ID,
    ]);
    await ctx.stub.putState(acaraNameIndexKey, Buffer.from("\u0000"));

    // Komposite Nama
    indexName = `${asset.Organisasi}~Nama`;
    let namaNameIndexKey = await ctx.stub.createCompositeKey(indexName, [
      asset.Nama,
      asset.ID,
    ]);
    await ctx.stub.putState(namaNameIndexKey, Buffer.from("\u0000"));

    return JSON.stringify(asset);
  }

  // ReadAsset returns the asset stored in the world state with given idCert.
  async ReadAsset(ctx, idCert) {
    const assetJSON = await ctx.stub.getState(idCert); // get the asset from chaincode state
    if (!assetJSON || assetJSON.length === 0) {
      throw new Error(`The asset ${idCert} does not exist`);
    }
    const asset = JSON.parse(assetJSON.toString());

    // const timestamp = ctx.stub.getTxTimestamp();
    const history = await ctx.stub.getHistoryForKey(idCert);
    let hist = await history.next();
    asset.timestamp = new Date(
      hist.value.timestamp.seconds * 1000
    ).toISOString();
    // asset.timestamp = timestamp;

    asset.TxId = hist.value.txId;

    return JSON.stringify(asset);
  }

  // AssetExists returns true when asset with given ID exists in world state.
  async AssetExists(ctx, idCert) {
    const assetJSON = await ctx.stub.getState(idCert);
    return assetJSON && assetJSON.length > 0;
  }

  // UpdateAsset updates an existing asset in the world state with provided parameters.
  async UpdateAsset(
    ctx,
    idCert,
    acara,
    oraganisasi,
    nama,
    perihal,
    deskripsi,
    ttd1,
    ttd2,
    certificate
  ) {
    const exists = await this.AssetExists(ctx, idCert);
    if (!exists) {
      throw new Error(`The asset ${idCert} does not exist`);
    }

    let valAsbytes = await ctx.stub.getState(idCert); // get the asset from chaincode state
    let jsonResp = {};
    let oldAssetJSON;
    try {
      oldAssetJSON = JSON.parse(valAsbytes.toString());
    } catch (err) {
      jsonResp = {};
      jsonResp.error = `Failed to decode JSON of: ${idCert}`;
      throw new Error(jsonResp);
    }

    // overwriting original asset with new asset
    const updatedAsset = {
      docType: "certificate",
      ID: idCert,
      Acara: acara,
      Organisasi: oraganisasi,
      Nama: nama,
      Perihal: perihal,
      Deskripsi: deskripsi,
      TTD1: ttd1,
      TTD2: ttd2,
      Certificate: certificate,
    };
    // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
    await ctx.stub.putState(
      idCert,
      Buffer.from(stringify(sortKeysRecursive(updatedAsset)))
    );

    // Delete Old Composite

    // Organisasi Composite
    let indexNameOrganisasi = "Organisasi~";
    let organisasiNameIndexKey = await ctx.stub.createCompositeKey(
      indexNameOrganisasi,
      [oldAssetJSON.Organisasi, oldAssetJSON.ID]
    );
    if (!organisasiNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }

    //Komposite Acara
    let indexNameAcara = `${oldAssetJSON.Organisasi}~Acara`;
    let acaraNameIndexKey = await ctx.stub.createCompositeKey(indexNameAcara, [
      oldAssetJSON.Acara,
      oldAssetJSON.ID,
    ]);
    if (!acaraNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }

    // Komposite Nama
    let indexNameNama = `${oldAssetJSON.Organisasi}~Nama`;
    let namaNameIndexKey = await ctx.stub.createCompositeKey(indexNameNama, [
      oldAssetJSON.Nama,
      oldAssetJSON.ID,
    ]);
    if (!namaNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }

    //  Delete index entry to state.
    await ctx.stub.deleteState(organisasiNameIndexKey);
    await ctx.stub.deleteState(acaraNameIndexKey);
    await ctx.stub.deleteState(namaNameIndexKey);

    // Update Composite
    // Komposite Organisasi
    organisasiNameIndexKey = await ctx.stub.createCompositeKey(
      indexNameOrganisasi,
      [updatedAsset.Organisasi, updatedAsset.ID]
    );
    await ctx.stub.putState(organisasiNameIndexKey, Buffer.from("\u0000"));

    //Komposite Acara
    indexNameAcara = `${updatedAsset.Organisasi}~Acara`;
    acaraNameIndexKey = await ctx.stub.createCompositeKey(indexNameAcara, [
      updatedAsset.Acara,
      updatedAsset.ID,
    ]);
    await ctx.stub.putState(acaraNameIndexKey, Buffer.from("\u0000"));

    // Komposite Nama
    indexNameNama = `${updatedAsset.Organisasi}~Nama`;
    namaNameIndexKey = await ctx.stub.createCompositeKey(indexNameNama, [
      updatedAsset.Nama,
      updatedAsset.ID,
    ]);
    await ctx.stub.putState(namaNameIndexKey, Buffer.from("\u0000"));

    return JSON.stringify(updatedAsset);
  }

  // GetAssetHistory returns the chain of custody for an asset since issuance.
  async GetAssetHistory(ctx, idCert) {
    let resultsIterator = await ctx.stub.getHistoryForKey(idCert);
    let results = await this._GetAllResults(resultsIterator, true);

    return JSON.stringify(results);
  }

  // DeleteAsset deletes an given asset from the world state.
  async DeleteAsset(ctx, idCert) {
    const exists = await this.AssetExists(ctx, idCert);
    if (!exists) {
      throw new Error(`The asset ${idCert} does not exist`);
    }

    let valAsbytes = await ctx.stub.getState(idCert); // get the asset from chaincode state
    let jsonResp = {};
    if (!valAsbytes) {
      jsonResp.error = `Asset does not exist: ${idCert}`;
      throw new Error(jsonResp);
    }
    let assetJSON;
    try {
      assetJSON = JSON.parse(valAsbytes.toString());
    } catch (err) {
      jsonResp = {};
      jsonResp.error = `Failed to decode JSON of: ${idCert}`;
      throw new Error(jsonResp);
    }
    // delete the index

    // Organisasi Composite
    let indexNameOrganisasi = "Organisasi~";
    let organisasiNameIndexKey = await ctx.stub.createCompositeKey(
      indexNameOrganisasi,
      [assetJSON.Organisasi, assetJSON.ID]
    );
    if (!organisasiNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }

    //Komposite Acara
    let indexNameAcara = `${assetJSON.Organisasi}~Acara`;
    let acaraNameIndexKey = await ctx.stub.createCompositeKey(indexNameAcara, [
      assetJSON.Acara,
      assetJSON.ID,
    ]);
    if (!acaraNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }

    // Komposite Nama
    let indexNameNama = `${assetJSON.Organisasi}~Nama`;
    let namaNameIndexKey = await ctx.stub.createCompositeKey(indexNameNama, [
      assetJSON.Nama,
      assetJSON.ID,
    ]);
    if (!namaNameIndexKey) {
      throw new Error(" Failed to create the createCompositeKey");
    }

    //  Delete index entry to state.
    await ctx.stub.deleteState(organisasiNameIndexKey);
    await ctx.stub.deleteState(acaraNameIndexKey);
    await ctx.stub.deleteState(namaNameIndexKey);

    return ctx.stub.deleteState(idCert);
  }

  // Get Asset By Organisasi
  async AssetByOrganisasi(ctx, organisasi) {
    const allResults = [];

    let organisasiAssetResultsIterator =
      await ctx.stub.getStateByPartialCompositeKey("Organisasi~", [organisasi]);

    // Iterate through result set and for each asset found, transfer to newOwner
    let responseRange = await organisasiAssetResultsIterator.next();
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
      let idCert = attributes[1];
      let assetAsBytes = await ctx.stub.getState(idCert);

      const strValue = Buffer.from(assetAsBytes.toString());
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      responseRange = await organisasiAssetResultsIterator.next();
    }
    return JSON.stringify(allResults);
  }

  // Get Asset By Acara
  async AssetByAcara(ctx, organisasi, acara) {
    const allResults = [];

    let acaraAssetResultsIterator =
      await ctx.stub.getStateByPartialCompositeKey(`${organisasi}~Acara`, [
        acara,
      ]);

    // Iterate through result set and for each asset found, transfer to newOwner
    let responseRange = await acaraAssetResultsIterator.next();
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
      let idCert = attributes[1];
      let assetAsBytes = await ctx.stub.getState(idCert);

      const strValue = Buffer.from(assetAsBytes.toString());
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      responseRange = await acaraAssetResultsIterator.next();
    }
    return JSON.stringify(allResults);
  }

  // Get Asset By Nama
  async AssetByNama(ctx, organisasi, nama) {
    const allResults = [];

    let namaAssetResultsIterator = await ctx.stub.getStateByPartialCompositeKey(
      `${organisasi}~Nama`,
      [nama]
    );

    // Iterate through result set and for each asset found, transfer to newOwner
    let responseRange = await namaAssetResultsIterator.next();
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
      let idCert = attributes[1];
      let assetAsBytes = await ctx.stub.getState(idCert);

      const strValue = Buffer.from(assetAsBytes.toString());
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      allResults.push(record);
      responseRange = await namaAssetResultsIterator.next();
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
          // jsonRes.Timestamp = res.value.timestamp;
          jsonRes.Timestamp = new Date(
            res.value.timestamp.seconds * 1000
          ).toISOString();
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
