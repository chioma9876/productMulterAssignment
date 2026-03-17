//import product model
const productModel = require('../models/product');
const fs = require('fs')

exports.addProduct = async(req, res) => {
    try {
        const {productName, ProductDescription, productPrice} = req.body;
        console.log('req file', req.file)
        console.log(req.body);
        
        const productData = {
            productName,
            ProductDescription,
            productPrice,
            ProductImage: req.file.path
        };

        const product =await productModel.create(productData);

        res.status(201).json({
            message: 'product added successfully',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const {id} = req.params;
        const {productName, ProductDescription, productPrice} = req.body
        const product = productModel.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        const productData = {
            productName,
            ProductDescription,
            productPrice
        }

        //check if a new file is being uploaded
        if (req.file) {
            //check if the old file exists
            const oldImageExists = fs.existsSync(product.ProductImage);
            if (oldImageExists) {
                //delete the old file and update the new file into the product object
                productData.ProductImage = req.file.path;
                fs.unlinkSync(product.ProductImage)
            }
        }

       const updatedProduct = await productModel.update(productData, {where : {id}})

       //send a success response
       res.status(200).json({
        message: 'product updated successfully',
        data: updatedProduct
       })
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

exports.getOne = async(req, res) => {
    try {
        const {id} = req.params;

        const product = await productModel.findByPk(id);
        if (!product) {
            return res.status(404).json({
                message: 'product not found'
            })
        }
        //send a success response
        res.status(200).json({
            message: 'product found',
            data: product
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.getAll = async(req, res) => {
    try {
        const products = await productModel.findAll()

        if (!products) {
            return res.status(404).json({
                message: 'products not found'
            })
        }
        res.status(200).json({
            message: 'products found',
            data: products
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

exports.deleteProduct = async(req, res) => {
    try {
        const {id} = req.params
        
        const deleteProduct = await productModel.destroy({where: {id}})

        if (!deleteProduct) {
            return res.status(404).json({
                message: 'product cannot be deleted'
            })
        }
        res.status(200).json({
            message: 'product deleted successfully',
            data: deleteProduct
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}