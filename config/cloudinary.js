const cloudinary = require('cloudinary').v2;

const API_KEY = process.env.API_KEY
const API_NAME = process.env.API_NAME
const API_SECRET = process.env.API_SECRET

cloudinary.config({
    cloud_name: API_NAME,
    api_key: API_KEY,
    api_secret: API_SECRET
})

module.exports = cloudinary