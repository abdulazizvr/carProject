const {sign, verify} = require("jsonwebtoken")
require("../config")

module.exports = {
    SIGN: (value)=> sign(value,process.env.SECRET),
    VERIFY: (value)=> verify(value,process.env.SECRET)
}