import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Products = db.define('product', {
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false, //isian tidak boleh null
        validate: {
            notEmpty: true //tidak boleh empty string
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty:true,
            len: [3,100]
        }
    },
    price:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    },
}, {
    freezeTableName: true
});

Users.hasMany(Products);    //1 user dapat menginput banyak produk
Products.belongsTo(Users, {foreignKey: 'userId'})

export default Products;