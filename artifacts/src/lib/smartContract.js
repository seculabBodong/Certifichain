/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// Deterministic JSON.stringify()
const stringify  = require('json-stringify-deterministic');
const sortKeysRecursive  = require('sort-keys-recursive');
const { Contract } = require('fabric-contract-api');
const { contracts } = require('..');

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ID: '001asd2',
                ACARA: 'Riset Grup 2023',
                ORGANISASI: 'SECULAB',
                NAMA: 'asep',
                PERIHAL: 'Sertifikat Partisipasi',
                DESKRIBSI: "TERIMA KASIH ATAS ..." ,
                TTD: 'TTD_SECULAB',    
            },
            {
                ID: '021bdf2',
                ACARA: 'Riset Grup 2023',
                ORGANISASI: 'SECULAB',
                NAMA: 'juan',
                PERIHAL: 'Sertifikat Partisipasi',
                DESKRIBSI: "TERIMA KASIH ATAS ..." ,
                TTD: 'TTD_SECULAB',
            },
            {
                ID: '1230asd',
                ACARA: 'Studi Grup 2023',
                ORGANISASI: 'SECULAB',
                NAMA: 'fahri',
                PERIHAL: 'Sertifikat Partisipasi',
                DESKRIBSI: "TERIMA KASIH ATAS ..." ,
                TTD: 'TTD_SECULAB',
            },
            {
                ID: '88123as',
                ACARA: 'Riset Grup 2023',
                ORGANISASI: 'ISMILE',
                NAMA: 'juan',
                PERIHAL: 'Sertifikat Partisipasi',
                DESKRIBSI: "TERIMA KASIH ATAS ..." ,
                TTD: 'TTD_ISMILE',
            },
        ];

        for (const asset of assets) {
            asset.docType = 'asset';
            // example of how to write to world state deterministically
            // use convetion of alphabetic order
            // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
            // when retrieving data, in any lang, the order of data will be the same and consequently also the corresonding hash
            // await ctx.stub.putState(asset.ID, Buffer.from(stringify(sortKeysRecursive(asset))));
        }
        return assets;
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(ctx, id, acara, organisasi, nama, perihal, deskribsi, ttd) {
        const exists = await this.AssetExists(ctx, id);
        if (exists) {
            throw new Error(`The asset ${id} already exists`);
        }

        const asset = {
            ID: id,
            ACARA: acara,
            ORGANISASI: organisasi,
            NAMA: nama,
            PERIHAL: perihal,
            DESKRIBSI: deskribsi ,
            TTD: ttd,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(asset))));
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
    async UpdateAsset(ctx, id, acara, organisasi, nama, perihal, deskribsi, ttd) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            ID: id,
            ACARA: acara,
            ORGANISASI: organisasi,
            NAMA: nama,
            PERIHAL: perihal,
            DESKRIBSI: deskribsi ,
            TTD: ttd,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(id, Buffer.from(stringify(sortKeysRecursive(updatedAsset))));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, id) {
        const exists = await this.AssetExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, id) {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx, acara, organisasi) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange(acara, organisasi);
        console.log(iterator);
        // let result = await iterator.next();
        // while (!result.done) {
        //     const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
        //     let record;
        //     try {
        //         record = JSON.parse(strValue);
        //     } catch (err) {
        //         console.log(err);
        //         record = strValue;
        //     }
        //     allResults.push(record);
        //     result = await iterator.next();
        // }
        // return JSON.stringify(allResults);
    }
}

module.exports = AssetTransfer;
const test = new AssetTransfer();
console.log(test.InitLedger());
console.log(test.ReadAsset('001asd2'))
