const { Router } = require("express");
const router = Router();
const {sendEmail} = require("../utils/utils")

router.post("/",  async (req,res)=>{
    const {name, mail, message} = req.body;
    try{
        
        const body =  
        {from: '"Mensaje de contacto 🐶" <paseadorescuidadores@gmail.com>',
         to: "paseadorescuidadores@gmail.com", 
         subject: "Contacto", 
         html: `<b>Nombre del usuario: ${name}, email ${mail}.</b>
          <b>Mensaje : ${message}</b>`
        }
        
        await sendEmail(body)
    

    res.status(200).send('Mensaje enviado')
    } catch (error) {
        res.status(500).send(error)
    }
   
})

module.exports= router

