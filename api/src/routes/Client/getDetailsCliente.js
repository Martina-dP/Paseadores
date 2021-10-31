const { Router } = require("express");
const { Client } = require("../../db");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const dato = await Client.findOne({
      where: {
        id: id,
      },
    });

    const detalleDatos = {
      id: dato.id,
      name: dato.name,
      surname: dato.surname,
      image: dato.image,
      phone: dato.phone,
      email: dato.email,
      ubication: dato.ubication,
      description: dato.description,
      latitude: dato.latitude,
      longitude: dato.longitude
    };

    if (detalleDatos) {
      res.status(200).send(detalleDatos);
    } else {
      res.status(404).send("No se encontró al paseador");
    }
  } catch {
    res.status(500).send("Ecurrió un error");
  }
});

module.exports = router;