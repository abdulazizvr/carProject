module.exports = {
    SELECT : "select * from cars",
    INSERT : "INSERT INTO cars (car_name,color,model,position,car_image,price)  values($1,$2,$3,$4,$5,$6) returning id",
    UPDATE : "update cars set car_name = $2, color = $3, model = $4, position = $5, car_image = $6, price = $7  where id = $1  returning id",
    DELETE : "delete from cars where id = $1 returning *",

}