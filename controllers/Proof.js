import { Op } from "sequelize";
import Users from "../models/UserModel.js";
import Proof from "../models/ProofModel.js";

export const getProofById = async (req, res) => {
    try {
        const proof = await Proof.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!proof) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Proof.findOne({
                attributes: ['uuid','name'],
                where: {
                    id: proof.id
                },
                include: [{
                    model: Users,
                    attributes: ['name', 'email']    //terdapat relasi antara user dan produk
                }]
            });
        }else{
            response = await Proof.findOne({
                attributes: ['uuid','name'],
                where: {
                    [Op.and]:[{id: proof.id},{userId: req.userId}]
                },
                include: [{
                    model: Users,    //terdapat relasi antara user dan produk
                    attributes: ['name', 'email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createProof = async (req, res) => {
    const {name, price} = req.body;
    try {
        await Proof.create({
            name: name,
            userId: req.userId,
        });
        res.status(201).json({msg: "Produk sukses dibuat"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteProof = async (req, res) => {
    try {
        const product = await Products.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!product) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, price} = req.body;
        if(req.role === "admin"){
            await Products.destroy({
                where: {
                    id: product.id
                }
            });
        }else{
            if(req.userId !== product.userId) return res.status(403).json({msg: "akses terlarang!"})
            await Products.destroy({
                where: {
                    [Op.and]:[{id: product.id},{userId: req.userId}]
                },
            });
        }
        res.status(200).json({msg: "produk telah suskses dihapus"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}