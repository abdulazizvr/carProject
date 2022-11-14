const { fetchAll, fetch } = require("../utils/pg.js");
const { SIGN, VERIFY } = require("../JWT/jwt");
const generator = require("generate-password");

const { SELECT,  INSERT, UPDATE, DELETE } = require("../query/user");
const fs = require("fs");
const path = require("path");

module.exports = {
  GET: async (req, res) => {
    try {
      let { id } = req.params;
      let users = await fetchAll(SELECT+(id?` where id = ${id}`: ''));
      res.json({
        status: 200,
        message: "Users",
        data: users,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: null,
      });
    }
  },
  POST: async (req, res) => {
    try {
      const { image } = req.files;
      let { firstName, lastName, contact, adress } = req.body;
      let imagePath = path.join(process.cwd(), "files", "users");
      let rand = generator.generate({
        length: 5,
        numbers: true,
        symbols: false,
      });
      let x = image.name.split(".");
      let { id } = await fetch(
        INSERT,
        firstName,
        lastName,
        contact,
        adress,
        "/users/" + rand + "." + x[x.length - 1]
      );
      await image.mv(imagePath + "/" + rand + "." + x[x.length - 1]);

      if (id)
        res.json({
          status: 200,
          message: "user added!",
          data: { token: SIGN(id) },
        });
      else throw new Error("User not found!");
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: null,
      });
    }
  },
  PUT: async (req, res) => {
    try {
      let { id } = req.params;
      if (!id)throw new Error("Not id")
      let user = await fetch(SELECT+` where id = ${id}`);
      if (!user) return res.send("Not found user = " + id);
      
      const image = req?.files?.image || null ;
      let { firstName, lastName, contact, adress } = req.body;
      if (!firstName && !lastName && !contact && !adress && !image)
        return res.send("you must send data for update!");
      if(image){
        let imagePath = path.join(process.cwd(), "files");
        let rand = generator.generate({
          length: 5,
          numbers: true,
          symbols: false,
        });
        let x = image.name.split(".");
        fs.unlinkSync((imagePath + user.image_link).replace(/\//g, "\\"));
        await image.mv(imagePath + "/users/" + rand + "." + x[x.length - 1]);
      }
      
      let updateuser = await fetch(
        UPDATE,
        id,
        firstName || user.first_name,
        lastName || user.last_name,
        contact || user.contact,
        adress || user.adress,
        image ? "/users/" + rand + "." + x[x.length - 1] : user.image_link
      );

      res.json({
        status: 200,
        message: "user updated!",
        data: { token: SIGN(updateuser) },
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: null,
      });
    }
  },
  DELETE: async (req, res) => {
    try {
      let { id } = req.params;
      if (!id)throw new Error("Not id")
      let user = await fetch(DELETE, id);
      let imagePath = path.join(process.cwd(), "files");
      fs.unlinkSync((imagePath + user.image_link).replace(/\//g, "\\"));
      if (!user) throw new Error("User not found!");
      res.json({
        status: 200,
        message: "user deleted!",
        data: user,
      });
    } catch (err) {
      res.json({
        status: 400,
        message: err.message,
        data: null,
      });
    }
  },
};
