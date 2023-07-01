'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

class deleteCertificateWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module instance.
     */
    constructor() {
        super();
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @return {Promise<TxStatus[]>}
    */

    async submitTransaction() {
        this.txIndex++;
                
        let certId = 'Client' + this.workerIndex + '_Cert' + this.txIndex.toString();

        let args = {
            contractId: 'basic',
            contractVersion: '1.0',
            contractFunction: 'DeleteAsset',
            contractArguments: [certId],
            timeout: 30
        };

        await this.sutAdapter.sendRequests(args);
    }
}

/**
 * Create a new instance of the workload module.
 * @return {WorkloadModuleInterface}
 */
function createWorkloadModule() {
    return new deleteCertificateWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;