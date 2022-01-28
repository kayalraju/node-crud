const express=require('express')
const route=express.Router()
const ProductController=require('../controller/ProductController.js')



route.get('/',ProductController.Productview)
route.get('/add-product',ProductController.AddProduct)
route.post('/addpost-product',ProductController.AddPostProduct)
route.get('/edit-product/:p_id',ProductController.EditProduct)
route.post('/update-product',ProductController.UpdateProduct)
route.get('/delete-product/:p_id',ProductController.DeleteProduct)

module.exports=route