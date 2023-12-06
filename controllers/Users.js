import Users from "../models/UserModel.js";
import argon2, { hash } from "argon2";
import path from "path";

export const getUsers = async (req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ["uuid", "name", "email", "role", "status", "image", "url", "urlDoc"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ["uuid", "name", "email", "role", "status", "image", "url", "urlDoc"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  const { name, email, password, confPassword, role } = req.body;
  if (password != confPassword)
    return res.status(400).json({
      msg: "Password dan confirm password tidak cocok",
    });
  const hashPassword = await argon2.hash(password);

  if (req.files === null)
  return res.status(400).json({ msg: "No File Uploaded" });
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const urlDoc = `${req.protocol}://${req.get("host")}/proof/${fileName}`;
  const allowedType = [".pdf", ".doc", ".docx"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid document" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Document must be less than 5 MB" });

  file.mv(`./public/proof/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
  });

  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
      status: "not_approved",
      image: "defaultPP.png",
      url: "http://172.16.10.53:5000/images/defaultPP.png",
      urlDoc: urlDoc
    });
    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password != confPassword)
    return res.status(400).json({
      msg: "Password dan confirm password tidak cocok",
    });
  try {
    await Users.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Upated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateApprove = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
  const { name, email, role, status } = req.body;
  try {
    await Users.update(
      {
        status: status,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Status Upated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "user tidak ditemukan" });
  try {
    await Users.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const saveProfilePicture = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/images/${fileName}`;
  const allowedType = [".png", ".jpg", ".jpeg"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid Images" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Image must be less than 5 MB" });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      await Product.create({ name: name, image: fileName, url: url });
      res.status(201).json({ msg: "Product Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};

export const saveProof = (req, res) => {
  if (req.files === null)
    return res.status(400).json({ msg: "No File Uploaded" });
  const name = req.body.title;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get("host")}/proof/${fileName}`;
  const allowedType = [".pdf", ".doc", ".docx"];

  if (!allowedType.includes(ext.toLowerCase()))
    return res.status(422).json({ msg: "Invalid document" });
  if (fileSize > 5000000)
    return res.status(422).json({ msg: "Document must be less than 5 MB" });

  file.mv(`./public/proof/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ msg: err.message });
    try {
      // await Product.create({ name: name, image: fileName, url: url });
      await Proof.create({name: name, image: fileName, url: url, userId: "1"})
      res.status(201).json({ msg: "Document Created Successfuly" });
    } catch (error) {
      console.log(error.message);
    }
  });
};
