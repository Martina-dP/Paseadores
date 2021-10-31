const { Router } = require("express");
const { User, Image } = require("../db");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const datos = await User.findOne({
      where: {
        id: id,
      },
      include: {
        model: Image,
      },
    });
    let servicio;
    if(datos.service === "Paseador") servicio = "Paseador"
    if(datos.service === "Cuidador") servicio = "Cuidador"
    if(datos.service === "Paseador y Cuidador") servicio = "Paseador y Cuidador"
    

    let hoy = new Date();
    let cumpleanos = datos.birth_day;
    let edad = hoy.getFullYear() - cumpleanos.getFullYear();
    let m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    
    const detallesDatos = {
      id: datos.id,
      name: datos.name,
      surname: datos.surname,
      birth_day: edad + " años",
      image: datos.image,
      phone: datos.phone,
      email: datos.email,
      ubication: datos.ubication,
      service: servicio,
      price: datos.price,
      description: datos.description,
      dni: datos.dni,
      morning: datos.morning,
      afternoon: datos.afternoon,
      images: datos.images,
      premium: datos.premium,
      status: datos.status,
      longitude: datos.longitude,
      latitude : datos.latitude
    };

    if (detallesDatos) {
      res.status(200).send(detallesDatos);
    } else {
      res.status(404).send("No se encontró al paseador");
    }
  } catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;
