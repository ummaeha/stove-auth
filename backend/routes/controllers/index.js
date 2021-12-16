const jwt = require('jsonwebtoken');
require("../../config/env.js")
const JWT_SECRET_KEY = process.env.JWT_ACCESS_SECRET;

console.log(JWT_SECRET_KEY);
