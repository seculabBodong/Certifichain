'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const fs = require('fs');
const path = require('path');

// Membaca isi direktori
function readImagesFromFolder(folderPath){
    const imageList = [];
    
    const files = fs.readdirSync(folderPath);
    
    files.forEach((file) => {
        const filePath = path.join(folderPath, file);
        const data = fs.readFileSync(filePath);
        const base64String = data.toString('base64');
        imageList.push(base64String);
    });

    return imageList;
}

const logo = readImagesFromFolder(path.join(__dirname, '../imgLogo/'));  
const acara = ['STUDY GROUP', 'RISET GROUP', 'WORKSHOP', 'SEMINAR', 'COMPETITION', 'PENGABDIAN MASYARAKAT', 'PELATIHAN'];
const organisasi = ['SECULAB', 'ISMILE', 'RNEST', 'SEA', 'MAGIC', 'EVCONN', 'HMTK', 'CONNECTION'];
const nama = ['Hamzah', 'Fauzan', 'Ivan', 'Faiz', 'Irfan', 'Alwi', 'Haikal', 'Rahmad', 'Ilham', 'Ikbal', 'Fandy'] ;
const perihal =  ['Penghargaan', 'Partisipasi', 'Kelulusan', 'Sertifikasi', 'Pengabdian', 'Kepemimpinan'];
const deskripsi = [
    "Diberikan kepada [nama penerima] atas dedikasinya dalam [kegiatan/acara/proyek].",
    "Penghargaan ini diberikan kepada [nama penerima] yang telah menunjukkan keunggulan dalam [bidang/kegiatan].",
    "Sertifikat ini diberikan kepada [nama penerima] untuk pengabdian luar biasa dalam [organisasi/komunitas].",
    "Penghargaan ini diberikan kepada [nama penerima] sebagai pengakuan atas prestasinya dalam [bidang/kegiatan].",
    "Diberikan kepada [nama penerima] atas kontribusinya yang signifikan dalam [proyek/acara/kursus].",
    "Sertifikat ini diberikan kepada [nama penerima] sebagai apresiasi atas kepemimpinannya yang luar biasa.",
    "Penghargaan ini diberikan kepada [nama penerima] yang telah menunjukkan dedikasi tinggi dan pencapaian luar biasa."
];
const author1 = ['Hamzah', 'Fauzan', 'Ivan', 'Faiz', 'Irfan', 'Alwi', 'Haikal', 'Rahmad', 'Ilham', 'Ikbal', 'Fandy'] ;
const jabatan1 =  ['Ketua Pelaksana', 'Ketua Acara', 'Koordinator Acara', 'Ketua Asistant', 'Koordinator Asistant','Ketua Lab', 'Koordinator Lab'];
const ttd1 =  readImagesFromFolder(path.join(__dirname, '../imgTtd/'));  
const author2 = ['Hamzah', 'Fauzan', 'Ivan', 'Faiz', 'Irfan', 'Alwi', 'Haikal', 'Rahmad', 'Ilham', 'Ikbal', 'Fandy'] ;
const jabatan2 = ['Ketua Pelaksana', 'Ketua Acara', 'Koordinator Acara', 'Ketua Asistant', 'Koordinator Asistant','Ketua Lab', 'Koordinator Lab'];
const ttd2 = readImagesFromFolder(path.join(__dirname, '../imgTtd/'));
const certificate = readImagesFromFolder(path.join(__dirname, '../imgCert/'));  

class createCertificateWorkload extends WorkloadModuleBase {
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
        let certLogo = logo[Math.floor(Math.random() * logo.length)];
        let certAcara = acara[Math.floor(Math.random() * acara.length)];
        let certOrganisasi = organisasi[Math.floor(Math.random() * organisasi.length)];
        let certNama = nama[Math.floor(Math.random() * nama.length)] ;
        let certPerihal =  perihal[Math.floor(Math.random() * perihal.length)];
        let certDeskripsi = deskripsi[Math.floor(Math.random() * deskripsi.length)];
        let certAuthor1 = author1[Math.floor(Math.random() * author1.length)];
        let certJabatan1 =  jabatan1[Math.floor(Math.random() * jabatan1.length)];
        let certTtd1 =  ttd1[Math.floor(Math.random() * ttd1.length)];
        let certAuthor2 = author2[Math.floor(Math.random() * author2.length)];
        let certJabatan2 = jabatan2[Math.floor(Math.random() * jabatan2.length)];
        let certTtd2 = ttd2[Math.floor(Math.random() * ttd2.length)];
        let certCertificate = certificate[Math.floor(Math.random() * certificate.length)];

        let args = {
            contractId: 'basic',
            contractVersion: '1.0',
            contractFunction: 'CreateAsset',
            contractArguments: [certId, certLogo, certAcara, certOrganisasi, certNama, certPerihal, certDeskripsi, certAuthor1, certJabatan1, certTtd1, certAuthor2, certJabatan2, certTtd2, certCertificate],
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
    return new createCertificateWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;