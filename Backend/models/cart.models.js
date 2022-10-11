    module.exports = mongoose => {
    
        var cartproducts = mongoose.Schema({
            title: String,
            description: String,
            price: Number,
            category: String,
            image: String,
        }, {timestamps: true});
        cartproducts.method("toJSON", function() {
            const {__v, _id, ...object} = this.toObject();
            object.id = _id;
            return object;
        });
        const Product = mongoose.model("cart", cartproducts)
        return Product;
    }