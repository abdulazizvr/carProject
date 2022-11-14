module.exports = {
    SELECT : "select * from users",
    INSERT : "INSERT INTO users (first_name, last_name, contact, adress, image_link)  values($1,$2,$3,$4,$5) returning id",
    UPDATE : "update users set first_name = $2, last_name = $3, contact = $4, adress = $5, image_link = $6  where id = $1 returning id",
    DELETE : "delete from users where id = $1 returning *",
}