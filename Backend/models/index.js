const dbConfig = require("../db/db_config");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;
db.products = require("../models/products.models.js")(mongoose);
db.carts = require('../models/cart.models')

module.exports = db;
