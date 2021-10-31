const { Router } = require("express");
const { Orden, User ,Client } = require("../db");
const {sendEmail} = require("../utils/utils")

const router = Router();

router.put("/", async (req, res) => {
  const answer = req.body;
  
  try {
    const datos = await Orden.update({estadoReserva: answer.estadoReserva, color : 'green'},
    {
        where: {
            id : answer.id
        }
      })

      if (datos) {
        const orden = await Orden.findOne({
          where: {
              id: answer.id
          }
      })
      //console.log(orden.userId)
      
    const paseador = await User.findOne({
      where: {
          id: orden.userId
      }
  })
  
  const dueño = await Client.findOne({
      where: {
          id: orden.clientId
      }
  })
  
  const body =  
  {from: `Solicitud ${orden.estadoReserva} 🐶 <paseadorescuidadores@gmail.com>`,
   to: dueño.email, 
   subject: "Solicitud de turno", 
   html: `<b>Hola ${dueño.name}, te queremos informar que tu solicitud  ha sido ${orden.estadoReserva} por ${paseador.name}. </b>
   <b>Ingesa a nuestra página para más detalles!</b>`
  }
  
  await sendEmail(body)

      res.status(200).send(datos); 
    } else {
      res.status(404).send("No se encontro la orden");
    }
  } catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;