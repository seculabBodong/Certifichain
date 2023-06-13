import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Proof = db.define('proof', {
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
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty:true,
        }
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
}, {
    freezeTableName: true
});

Users.hasOne(Proof);    //1 user dapat menginput banyak produk
Proof.belongsTo(Users, {foreignKey: 'userId'})

export default Proof;