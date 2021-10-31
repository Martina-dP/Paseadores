const { Router } = require('express');
const {Image } = require('../db')
const cloudinary = require ('cloudinary').v2;
const router = Router();


cloudinary.config({ 
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})  



router.delete("/:public_id", async (req,res)=>{
    const {public_id} = req.params;
    const img = await Image.findOne({
        where: {
            public_id: public_id
        }
    })
    if (img){
        const deleteImg = await img.destroy()
        await cloudinary.uploader.destroy(public_id)
        res.status(200).send('Imagen eliminada')
    }
    
    else{
        res.status(500).send('No se encontro la imagen')
    }

})

module.exports = router;