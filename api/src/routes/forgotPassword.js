const { Router } = require("express");
const { User } = require("../db");
const {sendEmail} = require("../utils/utils")
require("dotenv").config();
const frontURL = process.env.REACT_APP || "http://localhost:3000";
const router = Router();

router.put("/", async (req, res) => {
    const {email} = req.body
    if(!email){
        res.status(400).send({message: "email requerido"});
    }
    
    try{  
        const paseador = await User.findOne({
            where: {
                email: email
            }
        })
        const verificaciónLink = `${frontURL}/new-password/${paseador.name}`

        const body =  
        {from: '"Cambio Contraseña 🐶" <paseadorescuidadores@gmail.com>',
         to: paseador.email, 
         subject: "Recuperacion contraseña", 
         html: `<b>Ingresá al siguiente link para recuperar la contraseña</b>
         <a href="${verificaciónLink}">${verificaciónLink}</a>`
        }
        
        await sendEmail(body)
        
        res.status(200).send(verificaciónLink);
    }catch{
        res.status(500).send("No se pudo enviar el mail");
    }
});

module.exports = router;