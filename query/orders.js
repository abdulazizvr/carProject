module.exports = {
    SELECT:"SELECT * FROM orders",
    INSERT:"INSERT INTO orders (user_id,car_id,is_pay)  values($1,$2,$3) returning id",
    UPDATE:"UPDATE orders SET user_id = $2, car_id = $3, is_pay = $4 where id = $1",
    DELETE:"DELETE FROM orders where id = $1 returning *"
}