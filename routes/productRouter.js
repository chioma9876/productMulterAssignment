const express = require('express');
const router = express.Router();
const upload =require ('../middleware/multer')
const { addProduct, updateProduct, getOne, getAll, deleteProduct } = require('../controllers/productController');



router.post('/addProduct', upload.single('productImage'), addProduct);
router.patch('/updateProduct/:id', upload.single('productImage'), updateProduct);
router.get('/product/:id', getOne);
router.get('/products', getAll);
router.delete('/deleteProduct/:id', deleteProduct)

module.exports = router
