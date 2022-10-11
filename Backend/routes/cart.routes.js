module.exports = app => {
    const products = require("../controllers/cart.controllers")

    var router = require("express").Router();

    router.post('/', products.create);
    router.get('/', products.findAll);
    router.get('/:id', products.findOne);
    router.delete('/', products.deleteAll);
    router.delete('/:id', products.deleteOne);

    
    app.use('/api/cart', router)
}