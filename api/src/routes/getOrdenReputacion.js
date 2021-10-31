const { Router } = require("express");
const {Orden} = require("../db");


const router = Router();



router.post("/", async (req, res) => {
  const { userId, clientId } = req.body;
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
  console.log(userId, clientId)
  try {
   const solicitud = await Orden.findOne({
      where: {
        userId: userId,
        clientId: clientId,
        estadoReserva: 'confirmada',
      }, 
    });

    if (solicitud) {
      let result;
      let copy = solicitud.dataValues.fechaFinal

      let fechaFinal= solicitud.dataValues.fechaFinal.slice(0,10)
      let f = fechaFinal.replaceAll("-", "")

      let hoy = new Date();
      let fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
      let fe = fecha.replaceAll("-", "")


      if(fe > f){result = true}
      if(fe < f){result = false}
      if(fe === f){
        let horaF= copy.slice(11,13)
        let hora = hoy.getHours()
        if(hora >= horaF){
          result= true
        }else{result = false}
      }
        
        
      res.status(200).send(result); 
    } else {
      res.status(404).send(false);
    }
  } catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;
