const { Router } = require("express");
const { Image } = require("../db");
const cloudinary = require ('cloudinary').v2;
const multer = require ('multer');
const  path  = require("path");
const fs = require('fs-extra');
require("dotenv").config();
const frontURL = process.env.REACT_APP || "http://localhost:3000";


const router = Router();
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/uploads'),
    filename: (req, file, cb)=>{
        cb(null, new Date().getTime() + path.extname(file.originalname))
    } 
})

cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})  

router.use(multer({storage}).single('image'))

router.post("/:id",  async (req,res)=>{
    const {id} = req.params;
    try {
    const result = await cloudinary.uploader.upload(req.file.path);
    const newImage = await Image.create({
        imageURL : result.url,
        public_id: result.public_id,
        userId: id
    })
    await fs.unlink(req.file.path)
    res.redirect(`${frontURL}/walker/perfil/`+id)
    } catch (error) {
        console.log(error)
    }
   
})

module.exports= router