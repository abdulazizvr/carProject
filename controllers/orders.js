const { fetchAll, fetch } = require("../utils/pg.js");
const { SELECT, INSERT, UPDATE, DELETE } = require("../query/orders");

module.exports = {
  GET: async (req, res) => {
    try {
      const { id } = req.params;
      let orders = await fetchAll(SELECT + (id ? ` where id = ${id}` : ""));
      res.json({
        status: 200,
        message: "orders",
        data: orders,
      });
    } catch (error) {
      res.json({
        status: 400,
        message: error.message,
        data: null,
      });
    }
  },
  POST: async (req, res) => {
    try {
      let { user_id, car_id, is_pay } = req.body;
      // let { id } = await fetch(INSERT, user_id, car_id, is_pay);
      if (!id) {
        throw new Error("Server Error!");
      }
      res.json({
        status: 200,
        message: "Users",
        data: users,
      });
    } catch (error) {
      res.json({
        status: 400,
        message: error,
        data: null,
      });
    }
  },
  PUT: async (req, res) => {
    let { id } = req.params;
    let { order_name, color, model, position, order_image, price } = req.body;
    if (!order_name && !color && !model && !position && !order_image && !price)
      res.send("you must send data for update!");
    let order = await fetch("select * from orders where id = $1", id);
    if (!order) res.send("Not found order = " + id);
    let updateorder = await fetch(
      "update orders set order_name = $2, color = $3, model = $4, position = $5, order_image = $6, price = $7  where id = $1",
      id,
      order_name || order.order_name,
      color || order.color,
      model || order.model,
      position || order.position,
      order_image || order.order_image,
      price || order.price
    );
    res.send("updated order!");
  },
  DELETE: async (req, res) => {
    let { id } = req.params;
    let order = await fetch("delete from orders where id = $1 returning *", id);
    console.log(order);
    res.send(order);
  },
};
