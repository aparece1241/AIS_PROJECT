//Import product Model
const Product = require("../models/ProductModel");
//get the path
const path = require('path');
const basePath = path.dirname(__dirname);


//use multer
const multer = require('multer');


//set storage Engine
const storage = multer.diskStorage({
    destination:  function (req, file, cb) {
        cb(null, "Public/image")
      },
    filename: function(req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

//initialized upload function
const upload = multer({
    storage: storage
}).fields([{name:"productImage", maxCount: 1},{name:"productName", maxCount: 1},{name:"productPrice", maxCount: 1}]);



module.exports = {

    getProducts(req, res) {
        Product.find({}, (error, products) => {
            if (error) {
                return res.status(500).send(error);
            }
            return res.json({ "data": products });
        });
    },

    updateProduct(req, res) {
        const productId = req.params.id;
        const editedProduct = {
            product_name: req.body.product_name,
            product_price: req.body.product_price,
        }
        Product.findOneAndUpdate({ _id: productId }, { $set: editedProduct }, { new: true },
            (error, product) => {
                if (error) return res.status(500).send(error);
                return res.json({ "last_edited_product": product });
            });
    },

    deleteProduct(req, res) {
        const productId = req.params.id;
        Product.findOneIdAndUpdate({ _id: productId }, { $set: { deletedAt: new Date() } }, { new: true },
            (error, product) => {
                if (error) return res.status(500).send(error);
                return res.json({ "last_deleted_product": product });
            });
    },

    addProduct(req, res) {
        const newProduct = new Product(req.body);
        newProduct.save((error, product)=>{
            if(error) return res.status(500).send(error); 
            return res.json({"last_added_product": product});
        });
    },

    //test just temporary
    addImage(req, res){
        // return res.json({"data":req});
        upload(req, res, (error)=>{
            console.log(req.files.productName);
            if(error) return res.status(500).send(error);
            return res.json(req.files);
        })
    }
    
};