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
  async InitLedger(ctx) {
    // let idCert = await this._generateRandomID(ctx);
    const assets = [
      {
        ID: "random123",
        Logo: "uyhasj9== (base 64)",
        Acara: "ACARA 1",
        Organisasi: "Organisasi_Keamanan",
        Nama: "Test 1",
        Perihal: "Workshop",
        Deskripsi: "asdnqwienzliqlksdlamcpawenqlwe (contoh)",
        Author1: "Fauzan Ansori",
        Jabatan1: "Koor Assistent",
        TTD1: "eqwkvspdad== (base64)",
        Author2: "Hamzah Fatihulhaq",
        Jabatan2: "Ketua Pelaksana",
        TTD2: "qsdaserzxc== (base64)",
        Certificate: "asdqwvjaskaa== (base64)",
      },
    ];

    for (const asset of assets) {
      await this.CreateAsset(
        ctx,
        asset.ID,
        asset.Logo,
        asset.Acara,
        asset.Organisasi,
        asset.Nama,
        asset.Perihal,
        asset.Deskripsi,
        asset.Author1,
        asset.Jabatan1,
        asset.TTD1,
        asset.Author2,
        asset.Jabatan2,
        asset.TTD2,
        asset.Certificate
      );
    }
  }

  // CreateAsset issues a new asset to the world state with given details.
  async CreateAsset(
    ctx,
    idCert,
    logo,
    acara,
    oraganisasi,
    nama,
    perihal,
    deskripsi,
    author1,
    jabatan1,
    ttd1,
    author2,
    jabatan2,
    ttd2,
    certificate
  ) {
    if (idCert == "" && idCert != "random123") {
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
      Logo: logo,
      Acara: acara, 
      Organisasi: oraganisasi,
      Nama: nama,
      Perihal: perihal,
      Deskripsi: deskripsi,
      Author1: author1,
      Jabatan1: jabatan1,
      TTD1: ttd1,
      Author2: author2,
      Jabatan2: jabatan2,
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

    const history = await ctx.stub.getHistoryForKey(idCert);
    
    let hist = await this._HistoryTime(history, true);
    asset.time = {
      "createDate": hist.createDate,
      "lastModified": hist.lastModified
    };

    asset.txId = hist.TxId;

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
    logo,
    acara,
    oraganisasi,
    nama,
    perihal,
    deskripsi,
    author1,
    jabatan1,
    ttd1,
    author2,
    jabatan2,
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
      Logo: logo,
      Acara: acara,
      Organisasi: oraganisasi,
      Nama: nama,
      Perihal: perihal,
      Deskripsi: deskripsi,
      Author1: author1,
      Jabatan1: jabatan1,
      TTD1: ttd1,
      Author2: author2,
      Jabatan2: jabatan2,
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
      // Time rocord
      const history = await ctx.stub.getHistoryForKey(idCert);
      let hist = await this._HistoryTime(history, true);
      
      const strValue = Buffer.from(assetAsBytes.toString());
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      // record.time = hist;
      
      record.time = {
        "createDate": hist.createDate,
        "lastModified": hist.lastModified
      };
  
      record.txId = hist.TxId;

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

      // Time rocord
      const history = await ctx.stub.getHistoryForKey(idCert);
      let hist = await this._HistoryTime(history, true);

      const strValue = Buffer.from(assetAsBytes.toString());
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      // record.time = hist;

      record.time = {
        "createDate": hist.createDate,
        "lastModified": hist.lastModified
      };
  
      record.txId = hist.TxId;

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

      // Time rocord
      const history = await ctx.stub.getHistoryForKey(idCert);
      let hist = await this._HistoryTime(history, true);

      const strValue = Buffer.from(assetAsBytes.toString());
      let record;
      try {
        record = JSON.parse(strValue);
      } catch (err) {
        console.log(err);
        record = strValue;
      }
      // record.time = hist;

      record.time = {
        "createDate": hist.createDate,
        "lastModified": hist.lastModified
      };
  
      record.txId = hist.TxId;
      
      allResults.push(record);
      responseRange = await namaAssetResultsIterator.next();
    }
    return JSON.stringify(allResults);
  }
  
  async _HistoryTime(iterator, isHistory){
    let time = [];
    let TxIds = [];
    let res = await iterator.next();
    let jsonRes = {};
    while (!res.done) {
      if (res.value && res.value.value.toString()) {
        console.log(res.value.value.toString("utf8"));
        if (isHistory && isHistory === true) {
          // jsonRes.Timestamp = res.value.timestamp;
          // let TxId = res.value.txId;
          TxIds.push(
            res.value.txId
          );
          let dateTime = new Date(res.value.timestamp.seconds * 1000).toISOString();
          
          let options = {
            timeZone: 'Asia/Jakarta',
            timeZoneName: 'short',
            hour12: false,
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          };

          dateTime = new Date(dateTime).toLocaleString('id-ID', options);
          time.push(
            dateTime
            );
         
        } else {
          jsonRes.Key = res.value.key;
          try {
            jsonRes.Record = JSON.parse(res.value.value.toString("utf8"));
          } catch (err) {
            console.log(err);
            jsonRes.Record = res.value.value.toString("utf8");
          }
        }
      }
      res = await iterator.next();
    }
    
    jsonRes.TxId = TxIds[0];

    let lastIndex = time.length -1;
    if (lastIndex > 0){
      jsonRes.createDate = time[lastIndex];
      jsonRes.lastModified =  time[0];
    }else{
      jsonRes.createDate = time[0];
      jsonRes.lastModified =  time[0];
    }

    iterator.close();
    return jsonRes;
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
          // jsonRes.Timestamp = new Date(
          //   res.value.timestamp.seconds * 1000
          // ).toISOString();

          let dateTime = new Date(res.value.timestamp.seconds * 1000).toISOString();

          let options = {
            timeZone: 'Asia/Jakarta',
            timeZoneName: 'short',
            hour12: false,
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          };

          jsonRes.Timestamp = new Date(dateTime).toLocaleString('id-ID', options);

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
