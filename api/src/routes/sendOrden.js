const { Router } = require("express");
const { Orden, User, Client} = require("../db");
const {sendEmail} = require("../utils/utils")

const router = Router();


router.post("/",  async (req,res)=>{
    // const {userId, clientId} = req.params;
    const {fechaInicio,fechaFinal,userId, clientId,ubicacion} = req.body;
    try {
    const orden = await Orden.create({
        userId: userId,
        clientId: clientId,
        fechaInicio,
        fechaFinal,
        ubicacion
    })

    if(orden){
        
        const paseador = await User.findOne({
            where: {
                id: userId
            }
        })
        
        const dueño = await Client.findOne({
            where: {
                id: clientId
            }
        })

        const body =  
        {from: '"Tenés una solicitud de un turno 🐶" <paseadorescuidadores@gmail.com>',
         to: paseador.email, 
         subject: "Solicitud de turno", 
         html: `<b>Hola ${paseador.name}, te queremos informar que ${dueño.name} requiere tus servicios durante el dia y las horas: ${orden.fechaInicio} - ${orden.fechaFinal}.</b>
          <b>Responde cuanto antes esta solitud!</b>`
        }
        
        await sendEmail(body)
    }

    res.status(200).send('orden enviada')
    } catch (error) {
        console.log(error)
    }
   
})

module.exports= router

