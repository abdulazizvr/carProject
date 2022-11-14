const { fetchAll, fetch } = require("../utils/pg.js");
const { SELECT, INSERT, UPDATE, DELETE } = require("../query/cars");
const fs = require('fs');
const path = require('path');

module.exports = {
  GET: async (req, res) => {
    try {
      const { id } = req.params;
      let cars = await fetchAll(SELECT + (id ? ` where id = ${id}` : ""));
      res.json({
        status: 200,
        message: "Cars",
        data: cars,
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
      const image = req.files?.image || "";
      let { car_name, color, model, position, price } = req.body;
      if (!image || !car_name || !color || !model || !position || !price)
        throw new Error("You must send all data!");
      let imagePath = path.join(process.cwd(), "files", "cars");
      let x = image.name.split(".");
      await image.mv(
        imagePath +
          "/" +
          car_name.replace(/\s/g, "") +
          "." +
          x[x.length - 1]
      );

      let { id } = await fetch(
        INSERT,
        car_name,
        color,
        model,
        position,
        "/cars/" + car_name.replace(/\s/g, "") + "." + x[x.length - 1],
        price
      );
      if (id)
        res.json({
          status: 200,
          message: "car added!",
          data: null,
        });
      else throw new Error("Server error!");
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
      if (!id) throw new Error("Not id");
      let car = await fetch(SELECT + ` where id = ${id}`);
      if (!car) throw new Error("Not found car = " + id);
      const image = req?.files?.image || null;
      let { car_name, color, model, position, price } = req.body;
      if (!car_name && !color && !model && !position && !image && !price)
        throw new Error("You must send data for update!");
      let x;
      if (image) {
        let imagePath = path.join(process.cwd(), "files");
        x = image.name.split(".");
        fs.unlinkSync((imagePath + car.car_image).replace(/\//g, "\\"));

        await image.mv(
          imagePath +
            "/cars/" +(car_name||car.car_name).replace(/\s/g, "") +
            "." +
            x[x.length - 1]
        );
      }
      let updatecar = await fetch(
        UPDATE,
        id,
        car_name || car.car_name,
        color || car.color,
        model || car.model,
        position || car.position,
        image
          ? "/cars/" + car_name.replace(/\s/g, "") + "." + x[x.length - 1]
          : car.car_image,
        price || car.price
      );
      res.json({
        status: 200,
        message: "car updated!",
        data: null,
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
      if (!id) throw new Error("Not id");
      let car = await fetch(DELETE, id);
      let imagePath = path.join(process.cwd(), "files", "cars");
      fs.unlinkSync((imagePath + car.car_image).replace(/\//g, "\\"));
      res.json({
        status: 200,
        message: "car deleted",
        data: car.car_name,
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


