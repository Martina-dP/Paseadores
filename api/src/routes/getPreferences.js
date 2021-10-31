const { Router } = require("express");
const { Preference } = require("../db");

const router = Router();

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  // console.log('preferences',userId)
  

  const preferencias = await Preference.findOne({
    where: {
      userId: userId,
    },
  });

  if (preferencias){
    const detalleOrden = {
      turno: preferencias.turno ,
      dias_trabajo: preferencias.dias_trabajo,
      perros_por_paseo: preferencias.perros_por_paseo ,
      duracion_paseos: preferencias.duracion_paseos?.length <=2 ?  preferencias.duracion_paseos + ":00:00" : preferencias.duracion_paseos,
      comienzo_jornada: preferencias.comienzo_jornada.length <= 2 ? preferencias.comienzo_jornada + ":00:00" : preferencias.comienzo_jornada,
      fin_jornada: preferencias.fin_jornada.length <= 2 ? preferencias.fin_jornada + ":00:00" : preferencias.fin_jornada
  
      // eventClick={handleEventClick}
     
    };
    console.log("PREFERENCIAAAAAAS", detalleOrden);

    res.status(200).send(detalleOrden);
  } else{

  const detalleOrden = {
    turno: "",
    dias_trabajo: "",
    perros_por_paseo: '',
    duracion_paseos: "",
    comienzo_jornada: "",
    fin_jornada: "",

    // eventClick={handleEventClick}
  }
  console.log("PREFERENCIAAAAAAS", detalleOrden);

  res.status(200).send(detalleOrden);

}  
});

module.exports = router;
