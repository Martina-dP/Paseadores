const { Router } = require("express");
const { User, Client, Administrator } = require("../../db");
const { Op } = require("sequelize");
const {sendEmail} = require("../../utils/utils");
require("dotenv").config();
const frontURL = process.env.REACT_APP || "http://localhost:3000";

const router = Router();

router.post("/", async (req, res) => {
  const { id} = req.body;

  try {
    const client = await Client.findOne({
        where: {
          id: id,
        },
      });
    const user = await User.findOne({
        where: {
          id: id,
        },
      });

    if (client) {
      //GET BY NAME

     
      const verificaciónLink = `${frontURL}/new-password/${client.name}`

      const body =  
      {from: '"Cambio Contraseña 👻" <paseadorescuidadores@gmail.com>',
       to: client.email, 
       subject: "Recuperacion contraseña", 
       html: `<b>Ingresá al siguiente link para recuperar la contraseña</b>
       <a href="${verificaciónLink}">${verificaciónLink}</a>`
      }
      
      await sendEmail(body)
      }else if(user){
        
        const verificaciónLink = `http://localhost:3000/new-password/${user.name}`

        const body =  
        {from: '"Cambio Contraseña 👻" <paseadorescuidadores@gmail.com>',
         to: user.email, 
         subject: "Recuperacion contraseña", 
         html: `<b>Ingresá al siguiente link para recuperar la contraseña</b>
         <a href="${verificaciónLink}">${verificaciónLink}</a>`
        }
        await sendEmail(body)
      }
      
      res.json("Email enviado")
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;